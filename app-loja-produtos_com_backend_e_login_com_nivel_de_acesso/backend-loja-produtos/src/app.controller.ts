import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
constructor(private readonly appService: AppService) {}

  //http://localhost:3000/exemplo1
  @Get("exemplo1")
  getExemplo1(): string {
    return "Exemplo 1";
  }

  //http://localhost:3000/
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
