import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { UserResponseDto } from 'src/dto/user/user.response.dto';
import { Role } from 'src/global/role.type';
import { Roles } from 'src/utils/roles.metadata';
import { ResponseDataWithEncryption } from 'src/global/response.data-with-encryption';
import { DataEncryption } from 'src/utils/data-encryption';
import { RequestData } from 'src/global/request.data';
// import { StringifyOptions } from 'querystring';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<ResponseDataWithEncryption<UserResponseDto[]>> {
    const users = (await this.userService.findAll()).sort(
      (a, b) => b.id - a.id,
    );
    return new ResponseDataWithEncryption<UserResponseDto[]>(
      HttpStatus.OK,
      HttpMessage.OK,
      users,
    );
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseDataWithEncryption<UserResponseDto>> {
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
  }

  @Get(':q')
  @Roles(Role.Admin)
  async search(
    @Query('q') q: string,
  ): Promise<ResponseDataWithEncryption<UserResponseDto[]>> {
    const users = await this.userService.findByUsernameAndEmail(q);
    if (!users || users.length === 0) {
      return new ResponseDataWithEncryption<UserResponseDto[]>(
        HttpStatus.NOT_FOUND,
        HttpMessage.NOT_FOUND,
        null,
      );
    }
    return new ResponseDataWithEncryption<UserResponseDto[]>(
      HttpStatus.OK,
      HttpMessage.OK,
      users,
    );
  }

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() data: RequestData,
  ): Promise<ResponseDataWithEncryption<UserResponseDto>> {
    const userDto = DataEncryption().decrypt(data.data);
    const user = await this.userService.create(userDto);
    return new ResponseDataWithEncryption<UserResponseDto>(
      HttpStatus.CREATED,
      HttpMessage.CREATED,
      user,
    );
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() data: RequestData,
  ): Promise<ResponseDataWithEncryption<UserResponseDto>> {
    const userDto = DataEncryption().decrypt(data.data);
    const user = await this.userService.update(id, userDto);
    return new ResponseDataWithEncryption<UserResponseDto>(
      HttpStatus.OK,
      HttpMessage.OK,
      user,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(
    @Param('id') id: string,
  ): Promise<ResponseDataWithEncryption<string>> {
    await this.userService.delete(id);
    return new ResponseDataWithEncryption<string>(
      HttpStatus.OK,
      HttpMessage.OK,
      null,
    );
  }
}
