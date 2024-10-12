import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';
import { UserRegistrationDto } from 'src/dto/user/user.registration.dto';
import { HttpMessage } from 'src/global/http.status';
import { JwtPayload } from 'src/utils/payload';
import { UserResponseDto } from 'src/dto/user/user.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async handleLogin(data: LoginRequestDto): Promise<{
    accessToken: string;
    refreshToken: string;
    user: UserResponseDto;
    tokenExpiry: number;
  }> {
    // Ensure that either username or email is provided
    if (!data.username && !data.email) {
      throw new UnauthorizedException(HttpMessage.USER_NOT_FOUND);
    }
    // Use username if available, otherwise use email
    data.username = (data.username || data.email).toLowerCase();
    const user = await this.userService.findOneByUsernameAndEmailForLogin(
      data.username,
    );
    if (!user) {
      throw new UnauthorizedException(HttpMessage.USER_NOT_FOUND);
    }
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException(HttpMessage.PASSWORD_INCORRECT);
    }

    user.lastLoginWebAt = new Date();
    await this.userService.store(user);
    const payload: JwtPayload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    const tokenExpiry = parseInt(process.env.JWT_EXPIRES_IN);

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLoginWebAt: user.lastLoginWebAt,
        activated: user.activated,
      },
      tokenExpiry,
    };
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    try {
      const userData = await this.handleLogin(loginRequestDto);
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async register(userDto: UserRegistrationDto): Promise<LoginResponseDto> {
    await this.userService.register(userDto);
    return;
  }

  // async refreshToken(refreshToken: string): Promise<LoginResponseDto> {
  //   const payload = await this.jwtService.verifyAsync(refreshToken);
  //   const accessToken = await this.jwtService.signAsync(payload);
  //   return new LoginResponseDto(accessToken, refreshToken);
  // }

  // async logout(userId: string): Promise<void> {
  //   await this.userService.update(userId, { refreshToken: null });
  // }
}
