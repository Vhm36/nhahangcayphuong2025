import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Định nghĩa DTO để cập nhật user, kế thừa từ CreateUserDto
// PartialType sẽ biến tất cả các trường thành tùy chọn (không bắt buộc)
export class UpdateUserDto extends PartialType(CreateUserDto) {}
