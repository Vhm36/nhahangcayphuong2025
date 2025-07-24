import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  // Import MongooseModule và đăng ký schema User để kết nối với collection users trong MongoDB
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  // Khai báo controller quản lý các route liên quan đến user
  controllers: [UserController],
  // Khai báo service xử lý logic nghiệp vụ liên quan đến user
  providers: [UserService],
})
export class UserModule { }
