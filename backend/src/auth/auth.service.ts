import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  // Đăng ký
  async register(dto: CreateUserDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException('Mật khẩu xác nhận không khớp');
    }

    const existingUser = this.userService.findByEmail(dto.email);
    // Kiểm tra xem email đã tồn tại chưa
    
    if ( await existingUser) { 
      throw new BadRequestException('Email đã tồn tại');
    }

    const hashedPassword = await this.hashPassword(dto.password);

    const user = await this.userService.create({
      name: dto.name,
      email: dto.email,
      phone: dto.phone,
      password: hashedPassword,
      role: dto.role
    });

    return {
      message: 'Đăng ký thành công',
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    };
  }

  // Đăng nhập
  async login(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    // Kiểm tra mật khẩu
    const isPasswordValid = await this.validatePassword(dto.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
    }
    // Tạo JWT token
    const token = await this.generateToken({ id: user._id, role: user.role });
    return {
      message: 'Đăng nhập thành công',
      access_token: token
    };
  }

  // Hash password
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  // Validate password
  async validatePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  // Generate JWT
  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
