import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { AuthService } from './auth.service';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { Public } from 'src/utils/public-metadata';
import { ResponseDataWithEncryption } from 'src/global/response.data-with-encryption';
import { RequestData } from 'src/global/request.data';
import { DataEncryption } from 'src/utils/data-encryption';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() data: RequestData): Promise<any> {
    const loginRequestDto = DataEncryption().decrypt(data.data);
    const response = await this.authService.login(loginRequestDto);
    return new ResponseDataWithEncryption<LoginResponseDto>(
      HttpStatus.OK,
      HttpMessage.SIGN_UP_SUCCESS,
      response,
    );
  }

  @Post('/register')
  @Public()
  async register(
    @Body() data: RequestData,
  ): Promise<ResponseDataWithEncryption<LoginResponseDto>> {
    const dataDecrypted = DataEncryption().decrypt(data.data);
    const response = await this.authService.register(dataDecrypted);
    return new ResponseDataWithEncryption<LoginResponseDto>(
      HttpStatus.OK,
      HttpMessage.SIGN_UP_SUCCESS,
      response,
    );
  }
}
