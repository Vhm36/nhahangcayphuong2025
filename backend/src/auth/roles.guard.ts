import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
// RolesGuard là một Guard kiểm tra quyền (role) của người dùng trước khi cho phép truy cập route
export class RolesGuard implements CanActivate {
  // Inject Reflector để lấy metadata được set bởi @Roles decorator
  constructor(private reflector: Reflector) {}

  // canActivate() được gọi trước khi xử lý request để xác định có cho phép truy cập không
  canActivate(context: ExecutionContext): boolean {
    // Lấy danh sách role yêu cầu từ metadata của handler hoặc class
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(), // Lấy metadata từ method
      context.getClass(),   // Lấy metadata từ controller
    ]);

    // Nếu route không yêu cầu role cụ thể => cho phép truy cập
    if (!requiredRoles) return true;

    // Lấy thông tin user từ request (được set sau khi JWT xác thực)
    const { user } = context.switchToHttp().getRequest();

    // Kiểm tra xem role của user có nằm trong danh sách role yêu cầu không
    return requiredRoles.includes(user.role);
  }
}
// RolesGuard sẽ được sử dụng trong các controller để bảo vệ các route yêu cầu quyền truy cập cụ thể
// Ví dụ: @UseGuards(RolesGuard) và @Roles('admin') sẽ bảo vệ route chỉ cho phép người dùng có role 'admin' truy cập
// Nếu người dùng không có role phù hợp, họ sẽ nhận được lỗi 403 Forbidden khi truy cập route đó
// Guard này giúp bảo vệ các route quan trọng trong ứng dụng, đảm bảo chỉ người dùng có quyền mới có thể truy cập các chức năng nhạy cảm như quản lý người dùng, xem báo cáo, v.v.  