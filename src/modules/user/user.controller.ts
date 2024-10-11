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
import { ResponseData } from 'src/global/response-data';
import { UserRequestDto } from 'src/dto/user/user.request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @Roles(Role.Admin)
  async findAll(): Promise<ResponseData<UserResponseDto[]>> {
    const users = (await this.userService.findAll()).sort(
      (a, b) => b.id - a.id,
    );
    return new ResponseData<UserResponseDto[]>(
      HttpStatus.OK,
      HttpMessage.OK,
      users,
    );
  }

  @Get(':id')
  @Roles(Role.Admin)
  async findOne(
    @Param('id') id: string,
  ): Promise<ResponseData<UserResponseDto>> {
    const user = await this.userService.findOne(id);
    if (!user) {
      return new ResponseData<UserResponseDto>(
        HttpStatus.NOT_FOUND,
        HttpMessage.NOT_FOUND,
        null,
      );
    }
    return new ResponseData<UserResponseDto>(
      HttpStatus.OK,
      HttpMessage.OK,
      user,
    );
  }

  @Get(':q')
  @Roles(Role.Admin)
  async search(
    @Query('q') q: string,
  ): Promise<ResponseData<UserResponseDto[]>> {
    const users = await this.userService.findByUsernameAndEmail(q);
    if (!users || users.length === 0) {
      return new ResponseData<UserResponseDto[]>(
        HttpStatus.NOT_FOUND,
        HttpMessage.NOT_FOUND,
        null,
      );
    }
    return new ResponseData<UserResponseDto[]>(
      HttpStatus.OK,
      HttpMessage.OK,
      users,
    );
  }

  @Post()
  @Roles(Role.Admin)
  async create(
    @Body() data: UserRequestDto,
  ): Promise<ResponseData<UserResponseDto>> {
    const user = await this.userService.create(data);
    return new ResponseData<UserResponseDto>(
      HttpStatus.CREATED,
      HttpMessage.CREATED,
      user,
    );
  }

  @Put(':id')
  @Roles(Role.Admin)
  async update(
    @Param('id') id: string,
    @Body() data: UserRequestDto,
  ): Promise<ResponseData<UserResponseDto>> {
    const user = await this.userService.update(id, data);
    return new ResponseData<UserResponseDto>(
      HttpStatus.OK,
      HttpMessage.OK,
      user,
    );
  }

  @Delete(':id')
  @Roles(Role.Admin)
  async delete(@Param('id') id: string): Promise<ResponseData<string>> {
    await this.userService.delete(id);
    return new ResponseData<string>(HttpStatus.OK, HttpMessage.OK, null);
  }
}
