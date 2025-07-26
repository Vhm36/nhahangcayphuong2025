import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../auth/dto/create-user.dto';
import { UpdateUserDto } from '../auth/dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  // Tạo user mới
  async create(data: Partial<CreateUserDto>) {
    const user = new this.userModel(data);
    return await user.save();
  }

  // Tìm user theo email (phục vụ Auth)
  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  // Lấy tất cả user
  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }

  // Lấy user theo id
  async findOne(id: string): Promise<UserDocument> {
    const user = await this.userModel.findById(id).exec();
    if (!user) throw new NotFoundException(`User với id ${id} không tồn tại`);
    return user;
  }

  // Cập nhật user theo id
  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
    if (!user) throw new NotFoundException(`Không tìm thấy user để cập nhật`);
    return user;
  }

  // Xóa user theo id
  async remove(id: string): Promise<UserDocument> {
    const user = await this.userModel.findByIdAndDelete(id);
    if (!user) throw new NotFoundException(`Không tìm thấy user để xóa`);
    return user;
  }
}
