import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // thiết lập CORS cho phép truy cập từ mọi nguồn 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // chỉ cho phép các thuộc tính có trong DTO
      transform: true, // Loại bỏ các thuộc tính không có trong DTO
    })
  )

  // Cấu hình cookie parser
  // để có thể đọc cookie từ request
  // và sử dụng trong các middleware hoặc guards
  app.use(cookieParser());
  app.setGlobalPrefix('api');
  app.use(helmet()); // Bảo mật HTTP headers (chống XSS, clickjacking, vv.)
  app.enableCors({ origin: true, credentials: true }); // Cho phép CORS với cookie/session

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addBearerAuth() // Nếu dùng JWT  
    .build();

  // Tạo tài liệu Swagger từ các decorators trong các controller
  // và các DTO đã được định nghĩa trong ứng dụng
  // và thiết lập Swagger UI tại đường dẫn /api-docs
  // để người dùng có thể xem và tương tác với API
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);
   


  const port = configService.get('PORT');
  app.enableCors();
  await app.listen(process.env.PORT || 5000, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${port}`);
  console.log(`Swagger Docs: http://localhost:${port}/api-docs`);
}
bootstrap();
