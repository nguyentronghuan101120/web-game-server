import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { JwtPayload } from './auth.guard';
import { HttpMessage } from 'src/global/http.status';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const data = loginRequestDto;
    data.username = data.username.toLowerCase() ?? data.email.toLowerCase();
    const user = await this.userService.findOneByUsername(data.username);
    if (!user) {
      throw new UnauthorizedException(HttpMessage.USER_NOT_FOUND);
    }
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(HttpMessage.PASSWORD_INCORRECT);
    }

    user.lastLoginAt = new Date();
    await this.userService.store(user);
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return new LoginResponseDto(user.username, accessToken);
  }

  async register(userDto: UserRegistrationDto): Promise<LoginResponseDto> {
    await this.userService.create(userDto);
    return;
  }
}
