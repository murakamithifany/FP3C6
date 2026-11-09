import { CanActivate, ExecutionContext, ForbiddenException, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { jwtConstants } from '../auth/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('Chegou na guarda.');

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      request['payload'] = payload;
    } catch (e) {
      throw new UnauthorizedException(); // token inválido ou expirado -> 401
    }

    // Nível "Geral" só pode consultar (GET). POST, PATCH e DELETE são bloqueados.
    const somenteLeitura = request.method === 'GET';
    if (!somenteLeitura && request['payload'].nivel === 'Geral') {
      throw new ForbiddenException('Você não tem permissão para realizar esta ação.');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // console.log(request.headers);

    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    console.log(type, token);

    return type === 'Bearer' ? token : undefined;
  }
}
