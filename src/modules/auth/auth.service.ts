import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginResponseDto } from 'src/dto/auth/login.response.dto';
import { comparePassword } from 'src/utils/bcrypt';
import { LoginRequestDto } from 'src/dto/auth/login.request.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const data = loginRequestDto;
    data.username = data.username.toLowerCase() ?? data.email.toLowerCase();
    const user = await this.userService.findOne(data.username);
    if (!user) {
      throw new UnauthorizedException('This user does not exist');
    }
    const isPasswordValid = await comparePassword(data.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Password is incorrect');
    }

    user.lastLoginAt = new Date();
    await this.userService.update(user.id.toString(), user);
    // const payload: JwtPayload = {
    //   userId: user.id,
    //   email: user.email,
    // };
    // const accessToken = await this.jwtService.signAsync(payload);

    return new LoginResponseDto(user.username, 'abc');
  }
}
