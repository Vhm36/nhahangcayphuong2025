import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    // Nạp biến môi trường toàn cục cho toàn bộ ứng dụng
    ConfigModule.forRoot(
      { isGlobal: true }
    ),
    // Kết nối MongoDB sử dụng Mongoose, có thể lấy uri từ biến môi trường nếu muốn bảo mật hơn
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        // Nên lấy uri từ biến môi trường: configService.get('MONGODB_URI')
        uri: 'mongodb+srv://nhahangcayphuong:nhahangcayphuong2025@project02.o33kjub.mongodb.net/?retryWrites=true&w=majority&appName=Project02',
        retryAttempts: 10, // Số lần thử lại khi kết nối thất bại
        retryDelay: 3000,  // Thời gian chờ giữa các lần thử lại (ms)
      }),
      inject: [ConfigService],
    }),
    // Import module quản lý user
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
