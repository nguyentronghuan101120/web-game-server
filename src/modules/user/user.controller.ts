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
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { UserResponseDto } from 'src/dto/user/user.response.dto';
import { Role } from 'src/global/role.type';
import { Roles } from 'src/utils/roles.metadata';
import { ResponseDataWithEncryption } from 'src/global/response.data-with-encryption';
import { DataEncryption } from 'src/utils/data-encryption';
import { RequestData } from 'src/global/request.data';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<ResponseDataWithEncryption<UserResponseDto[]>> {
    try {
      const users = (await this.userService.findAll()).sort(
        (a, b) => b.id - a.id,
      );
      return new ResponseDataWithEncryption<UserResponseDto[]>(
        HttpStatus.OK,
        HttpMessage.OK,
        users,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDataWithEncryption<UserResponseDto>> {
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        return new ResponseDataWithEncryption<UserResponseDto>(
          HttpStatus.NOT_FOUND,
          HttpMessage.NOT_FOUND,
          null,
        );
      }
      return new ResponseDataWithEncryption<UserResponseDto>(
        HttpStatus.OK,
        HttpMessage.OK,
        user,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() data: RequestData,
  ): Promise<ResponseDataWithEncryption<UserResponseDto>> {
    try {
      const userDto = DataEncryption().decrypt(data.data);
      const user = await this.userService.create(userDto);
      return new ResponseDataWithEncryption<UserResponseDto>(
        HttpStatus.CREATED,
        HttpMessage.CREATED,
        user,
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          HttpMessage.USER_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error.message, error.status);
    }
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() data: RequestData,
  ): Promise<ResponseDataWithEncryption<UserResponseDto>> {
    try {
      const userDto = DataEncryption().decrypt(data.data);
      const user = await this.userService.update(id, userDto);
      return new ResponseDataWithEncryption<UserResponseDto>(
        HttpStatus.OK,
        HttpMessage.OK,
        user,
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          HttpMessage.USER_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(
    @Param('id') id: string,
  ): Promise<ResponseDataWithEncryption<string>> {
    try {
      await this.userService.delete(id);
      return new ResponseDataWithEncryption<string>(
        HttpStatus.OK,
        HttpMessage.OK,
        null,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
