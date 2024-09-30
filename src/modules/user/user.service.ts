import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/user.dto';
import { UserResponse } from 'src/models/user.response';

@Injectable()
export class UserService {
  async findAll() {
    return [];
  }
  async findOne(id: string) {
    return {
      id,
      username: 'admin',
      password: 'admin',
      name: 'admin',
      phone: '0987654321',
      email: 'admin@gmail.com',
      status: 'active',
    } as UserResponse;
  }
  async create(userDto: UserDto) {
    return userDto;
  }
  async update(id: string) {
    return `User with ID: ${id} updated`;
  }
  async delete(id: string) {
    return `User with ID: ${id} deleted`;
  }
}
