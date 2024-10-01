import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ResponseData } from 'src/global/response.data';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { UserDto } from 'src/dto/user.dto';
import { UserEntity } from 'src/entities/user.entities';

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
      return new ResponseData<UserEntity>(HttpStatus.OK, HttpMessage.OK, user);
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }

  @Post()
  async create(@Body() userDto: UserDto): Promise<ResponseData<UserDto>> {
    try {
      const user = await this.userService.create(userDto);
      return new ResponseData(HttpStatus.CREATED, HttpMessage.CREATED, user);
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() userDto: UserDto,
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
