import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpCode,
} from '@nestjs/common';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { AuthService } from './auth.service';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { Public } from 'src/utils/public-metadata';
import { ResponseDataWithEncryption } from 'src/global/response.data-with-encryption';
import { ResponseData } from 'src/global/response-data';
import { RequestData } from 'src/global/request.data';
import { DataEncryption } from 'src/utils/data-encryption';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()
  async login(@Body() data: RequestData): Promise<any> {
    try {
      const loginRequestDto = DataEncryption().decrypt(data.data);
      const response = await this.authService.login(loginRequestDto);
      return new ResponseDataWithEncryption<LoginResponseDto>(
        HttpStatus.OK,
        HttpMessage.SIGN_IN_SUCCESS,
        response,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('login-for-postman')
  @HttpCode(HttpStatus.OK)
  @Public()
  async loginForPostman(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<any> {
    try {
      const data = await this.authService.login(loginRequestDto);
      return new ResponseData<LoginResponseDto>(
        HttpStatus.OK,
        HttpMessage.SIGN_IN_SUCCESS,
        data,
      );
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post('/register')
  @Public()
  async register(
    @Body() data: RequestData,
  ): Promise<ResponseDataWithEncryption<LoginResponseDto>> {
    try {
      const dataDecrypted = DataEncryption().decrypt(data.data);
      const response = await this.authService.register(dataDecrypted);
      return new ResponseDataWithEncryption<LoginResponseDto>(
        HttpStatus.OK,
        HttpMessage.SIGN_UP_SUCCESS,
        response,
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
