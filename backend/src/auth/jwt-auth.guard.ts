import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// JwtAuthGuard sử dụng Passport để xác thực JWT token trong request
// Nó kế thừa từ AuthGuard và sử dụng chiến lược 'jwt' đã được định nghĩa trong Passport
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
