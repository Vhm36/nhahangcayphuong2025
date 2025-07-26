import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@ApiTags("Chức năng")
@Controller('auth')
export class AuthController {
  private readonly newProperty = 'Chuc năng xác thực';

  constructor(private readonly authService: AuthService) {}

  @Post('register') // Đăng ký
  @ApiOperation({ summary: 'Register' }) // Thêm mới người dùng
  @ApiResponse({ status: 200, description: 'Đăng ký thành công' })
  async register(@Body() body: any) {
    const hashedPassword = await this.authService.hashPassword(body.password);
    return {
      message: 'Đăng ký thành công',
      user: { email: body.email, password: hashedPassword },
    };
  }

  @Post('login') // Đăng nhập
  @ApiOperation({ summary: 'Login' }) // Đăng nhập người dùng
  @ApiResponse({ status: 200, description: 'Đăng nhập thành công' })
  async login(@Body() body: any) {
    const token = await this.authService.generateToken({ email: body.email });
    return { message: 'Đăng nhập thành công', token };
  }
}
