import { IsString, MinLength, Matches, IsEmail, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class  CreateUserDto {
  @ApiProperty({ example: 'Nguyen Van A', description: 'Tên người dùng' })
  @IsString()
  name!: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email người dùng' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email!: string;

  @ApiProperty({ example: '0912345678', description: 'Số điện thoại' })
  @Matches(/^(0[0-9]{9})$/, { message: 'Số điện thoại không hợp lệ' })
  phone!: string;

  @ApiProperty({ example: 'password123', description: 'Mật khẩu lần 1' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  password!: string;

  @ApiProperty({ example: 'password123', description: 'Xác nhận mật khẩu' })
  @IsString()
  confirmPassword!: string;

  @ApiProperty({ example: 'user', description: 'Vai trò', enum: ['user', 'admin'] })
  @IsEnum(['user', 'admin'], { message: 'Vai trò phải là "user" hoặc "admin"' })
  role!: string;
}
