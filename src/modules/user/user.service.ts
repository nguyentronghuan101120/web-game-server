import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({ id: parseInt(id) });
  }

  async create(userDto: UserDto): Promise<UserEntity> {
    const user = this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }

  async update(id: string, userDto: UserDto): Promise<UserEntity> {
    await this.userRepository.update(id, userDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
