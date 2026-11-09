import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    console.log('Tratamento de exceptions...');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log(exception);

    let status = exception instanceof HttpException ? exception.getStatus() : 500;
    let message = "Falhou"; 
    if (exception instanceof JsonWebTokenError) {
      message = "Erro JWT";
    }

    response.status(status).json({
      statusCode: status,
      message
    });

  }
}
