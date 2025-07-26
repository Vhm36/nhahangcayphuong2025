import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule, MongooseModuleFactoryOptions } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    // Load biến môi trường toàn cục
    ConfigModule.forRoot({ isGlobal: true }),

    // Kết nối MongoDB dùng Mongoose và ConfigService
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<MongooseModuleFactoryOptions> => {
        return {
          uri: configService.get<string>('MONGO_URI') || 'mongodb+srv://nhahangcayphuong:nhahangcayphuong2025@project02.o33kjub.mongodb.net/?retryWrites=true&w=majority&appName=Project02',
          retryAttempts: 10,
          retryDelay: 3000,
        } as MongooseModuleFactoryOptions;
      },
    }),
    // Module quản lý xác thực người dùng
      AuthModule,
    // Module quản lý user
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
