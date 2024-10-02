import { Controller, Post, Body } from '@nestjs/common';
import { ResponseData } from 'src/global/response.data';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { AuthService } from './auth.service';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() loginRequestDto: LoginRequestDto,
  ): Promise<ResponseData<LoginResponseDto>> {
    try {
      const data = await this.authService.login(loginRequestDto);
      return new ResponseData<LoginResponseDto>(
        HttpStatus.OK,
        HttpMessage.OK,
        data,
      );
    } catch (error) {
      return new ResponseData(error.status, error.message, null);
    }
  }
}
