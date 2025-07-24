import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// Mô tả nhóm test cho UserController
describe('UserController', () => {
  let controller: UserController;

  // Thiết lập môi trường test trước mỗi lần chạy test
  beforeEach(async () => {
    // Tạo module test với UserController và UserService
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    // Lấy instance của UserController từ module test
    controller = module.get<UserController>(UserController);
  });

  // Kiểm tra controller đã được khởi tạo thành công chưa
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});