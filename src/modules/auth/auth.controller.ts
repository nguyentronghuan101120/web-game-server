import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { HttpMessage, HttpStatus } from 'src/global/http.status';
import { AuthService } from './auth.service';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { Public } from 'src/utils/public-metadata';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { ResponseData } from 'src/global/response-data';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginRequestDto: LoginRequestDto): Promise<any> {
    const response = await this.authService.login(loginRequestDto);
    return new ResponseData<LoginResponseDto>(
      HttpStatus.OK,
      HttpMessage.SIGN_IN_SUCCESS,
      response,
    );
  }

  @Post('/register')
  @Public()
  async register(
    @Body() data: UserRegistrationDto,
  ): Promise<ResponseData<LoginResponseDto>> {
    const response = await this.authService.register(data);
    return new ResponseData<LoginResponseDto>(
      HttpStatus.OK,
      HttpMessage.SIGN_UP_SUCCESS,
      response,
    );
  }
}
