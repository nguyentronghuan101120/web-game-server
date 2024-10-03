import { Controller, Post, Body, HttpException } from '@nestjs/common';
import { ResponseData } from 'src/global/response.data';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { AuthService } from './auth.service';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<ResponseData<LoginResponseDto>> {
    try {
      const data = await this.authService.login(loginRequestDto);
      return new ResponseData<LoginResponseDto>(
        HttpStatus.OK,
        HttpMessage.SIGN_IN_SUCCESS,
        data,
      );
    } catch (error) {
      throw new ResponseData(error.status, error.message, null);
    }
  }

  @Post('/register')
  async register(
    @Body() userDto: UserRegistrationDto,
  ): Promise<ResponseData<LoginResponseDto>> {
    try {
      const data = await this.authService.register(userDto);
      return new ResponseData<LoginResponseDto>(
        HttpStatus.OK,
        HttpMessage.SIGN_UP_SUCCESS,
        data,
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          HttpMessage.USER_ALREADY_EXISTS,
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException(
        HttpMessage.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
