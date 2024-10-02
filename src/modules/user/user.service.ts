import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entities';
import { encodePassword } from 'src/utils/bcrypt';

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
    try {
      const user = this.userRepository.create(userDto);
      user.password = encodePassword(user.password);
      return await this.userRepository.save(user);
    } catch {
      throw new BadRequestException(
        `Error creating user: user already exists `,
      );
    }
  }

  async update(id: string, userDto: UserDto): Promise<UserEntity> {
    await this.userRepository.update(id, userDto);
    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
