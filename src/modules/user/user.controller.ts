import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseData } from 'src/global/response.data';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { UserEntity } from 'src/entities/user.entities';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserUpdateDto } from 'src/dto/user/user.update.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<ResponseData<UserEntity[]>> {
    try {
      const users = await this.userService.findAll();
      return new ResponseData<UserEntity[]>(
        HttpStatus.OK,
        HttpMessage.OK,
        users,
      );
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseData<UserEntity>> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return new ResponseData(
          HttpStatus.NOT_FOUND,
          HttpMessage.NOT_FOUND,
          null,
        );
      }
      return new ResponseData<UserEntity>(HttpStatus.OK, HttpMessage.OK, user);
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }

  @Post()
  async create(
    @Body() userDto: UserRegistrationDto,
  ): Promise<ResponseData<UserRegistrationDto>> {
    try {
      const user = await this.userService.create(userDto);
      return new ResponseData(HttpStatus.CREATED, HttpMessage.CREATED, user);
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserUpdateDto,
  ): Promise<ResponseData<UserEntity>> {
    try {
      const user = await this.userService.update(id, userDto);
      return new ResponseData(HttpStatus.OK, HttpMessage.OK, user);
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseData<string>> {
    try {
      await this.userService.delete(id);
      return new ResponseData(
        HttpStatus.OK,
        HttpMessage.OK,
        `User with ID: ${id} deleted`,
      );
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }
}
