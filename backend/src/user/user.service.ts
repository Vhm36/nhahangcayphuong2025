import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  // Inject model User để thao tác với collection users trong MongoDB
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) { }

  // Tạo user mới từ dữ liệu nhận được (createUserDto)
  async create(createUserDto: CreateUserDto) {
    const user = new this.userModel(createUserDto);
    return await user.save();
  }

  // Lấy danh sách tất cả user
  async findAll() {
    return await this.userModel.find().exec();
  }

  // Tìm user theo id
  async findOne(id: string) {
    return await this.userModel.findById(id).exec();
  }

  // Cập nhật thông tin user theo id
  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userModel.findOneAndUpdate({ _id: id }, updateUserDto, { new: true });
  }

  // Xóa user theo id
  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}