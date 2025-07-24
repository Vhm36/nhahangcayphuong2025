import { IsString, MinLength, Matches, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger'; // Thư viện để tạo tài liệu API (Add)
// Định nghĩa DTO để validate dữ liệu khi tạo user mới
export class CreateUserDto {


  @ApiProperty({ example: 'Nguyen Van A', description: 'Tên người dùng' })
  @IsString()
  name!: string; // Tên người dùng, bắt buộc là chuỗi


  @ApiProperty({ example: 'john.doe@example.com', description: 'Email người dùng' })
  @IsString()
  email!: string; // Email, bắt buộc là chuỗi

  @ApiProperty({ example: '0912345678', description: 'Số điện thoại' })
  @IsString()
  @Matches(/^(0[0-9]{9})$/, { message: 'Số điện thoại không hợp lệ' })
  phone!: string; // Số điện thoại, bắt buộc là chuỗi và phải khớp với định dạng Việt Nam (10 chữ số, bắt đầu bằng 0)

  @ApiProperty({ example: 'password123', description: 'Mật khẩu lần 1' })
  @IsString()
  @MinLength(6)
  password!: string;

  @ApiProperty({ example: 'password123', description: 'Mật khẩu lần 2 (xác nhận)' })
  @IsString()
  confirmPassword!: string;

  @ApiProperty({ example: 'user', description: 'Vai trò', enum: ['user', 'admin'] })
  @IsEnum(['user', 'admin'], { message: 'Vai trò phải là "user" hoặc "admin"' })
  role!: string; // Vai trò, bắt buộc là chuỗi
}
