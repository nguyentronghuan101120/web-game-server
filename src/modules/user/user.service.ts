import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entities/user.entities';
import { encodePassword } from 'src/utils/bcrypt';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { NotifyMessage } from 'src/constants/notify-message';
import { UserResponseDto } from 'src/dto/user/user.response.dto';
import { UserRequestDto } from 'src/dto/user/user.request.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  private mapToUserResponseDto(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
      activated: user.activated,
    };
  }

  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find();
    return users.map(this.mapToUserResponseDto);
  }

  async findOne(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return this.mapToUserResponseDto(user);
  }

  async findOneByUsername(username: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: [{ username: username }, { email: username }],
    });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return this.mapToUserResponseDto(user);
  }

  async findOneByUsernameAndGetPassword(username: string): Promise<string> {
    const user = await this.userRepository.findOne({
      where: [{ username: username }, { email: username }],
    });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return user.password;
  }

  async findOneByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ email: email });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return this.mapToUserResponseDto(user);
  }

  async register(userDto: UserRegistrationDto): Promise<void> {
    const user = this.userRepository.create(userDto);
    user.password = encodePassword(user.password);
    await this.userRepository.save(user);
  }

  async create(userDto: UserRequestDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(userDto);
    user.password = encodePassword(user.password);
    const newUser = await this.userRepository.save(user);
    return this.mapToUserResponseDto(newUser);
  }

  async store(userDto: UserResponseDto): Promise<UserResponseDto> {
    const user = this.userRepository.create(userDto);
    const newUser = await this.userRepository.save(user);
    return this.mapToUserResponseDto(newUser);
  }

  async update(id: string, userDto: UserRequestDto): Promise<UserResponseDto> {
    try {
      const user = await this.userRepository.findOneBy({ id: parseInt(id) });
      if (!user) {
        throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
      }
      if (userDto.password && userDto.password.length > 0) {
        userDto.password = encodePassword(userDto.password);
      }
      await this.userRepository.update(id, userDto);
      return this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const user = await this.userRepository.findOneBy({ id: parseInt(id) });
      if (!user) {
        throw new HttpException(
          NotifyMessage.USER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.userRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}
