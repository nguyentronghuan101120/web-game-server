import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entities';
import { encodePassword } from 'src/utils/bcrypt';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';
import { NotifyMessage } from 'src/constants/notify-message';

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

  async create(userDto: UserRegistrationDto): Promise<UserEntity> {
    try {
      const user = this.userRepository.create(userDto);
      user.password = encodePassword(user.password);
      return await this.userRepository.save(user);
    } catch {
      throw new BadRequestException(NotifyMessage.USER_ALREADY_EXISTS);
    }
  }

  async update(id: string, userDto: UserUpdateDto): Promise<UserEntity> {
    try {
      const user = await this.userRepository.findOneBy({ id: parseInt(id) });
      if (!user) {
        throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
      }
      userDto.password = encodePassword(userDto.password);
      await this.userRepository.update(id, userDto);
      return this.findOne(id);
    } catch {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id: parseInt(id) });
      if (!user) {
        throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
      }
      await this.userRepository.delete(id);
    } catch {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
  }
}
