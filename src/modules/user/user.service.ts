import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { encodePassword } from 'src/utils/bcrypt';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { NotifyMessage } from 'src/constants/notify-message';
import { UserResponseDto } from 'src/dto/user/user.response.dto';
import { UserRequestDto } from 'src/dto/user/user.request.dto';

import { UserEntity } from 'src/entities/user.entity';
import { PaginationAndTotal } from 'src/global/pagination';
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
      lastLoginWebAt: user.lastLoginWebAt,
      activated: user.activated,
    };
  }

  // Fetch all users with pagination
  async findAll(
    page: number,
    limit: number,
  ): Promise<{
    users: UserResponseDto[];
    pagination: PaginationAndTotal;
  }> {
    const users = await this.userRepository.find({
      skip: (page - 1) * limit, // Skip the records for the current page
      take: limit, // Limit the number of records returned
    });
    const total = await this.userRepository.count();
    return {
      users: users.map(this.mapToUserResponseDto),
      pagination: { page, limit, total },
    };
  }

  async findOneById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOneBy({ id: parseInt(id) });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return this.mapToUserResponseDto(user);
  }

  async findOneByUsernameAndEmail(data: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: [{ username: data }, { email: data }],
    });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return this.mapToUserResponseDto(user);
  }

  async findOneByUsernameAndEmailForLogin(
    data: string,
  ): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: [{ username: data }, { email: data }],
    });
    if (!user) {
      throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
    }
    return user;
  }

  async findManyByUsernameAndEmail(data: string): Promise<UserResponseDto[]> {
    try {
      const user = await this.userRepository.find({
        where: [{ username: data }, { email: data }],
      });
      if (!user) {
        throw new BadRequestException(NotifyMessage.USER_NOT_FOUND);
      }
      return user.map(this.mapToUserResponseDto);
    } catch (error) {
      throw error;
    }
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
      return this.findOneById(id);
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
