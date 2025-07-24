import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// Controller gốc của ứng dụng, định nghĩa các route chung
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Route GET / trả về chuỗi hello từ AppService
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
