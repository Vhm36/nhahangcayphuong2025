import { SetMetadata } from '@nestjs/common'; // eslint-disable-line
export const ROLES_KEY = 'roles'; // Khóa metadata để lưu trữ danh sách role yêu cầu
// @Roles decorator sẽ được sử dụng để đánh dấu các route yêu cầu quyền truy cập cụ thể
// Ví dụ: @Roles('admin') sẽ chỉ cho phép người dùng có role 'admin' truy cập route đó
// Sử dụng SetMetadata để lưu trữ danh sách role vào metadata của route hoặc controller
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles); // eslint-disable-line      
