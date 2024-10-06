import { UserResponseDto } from '../user/user.response.dto';

export class LoginResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserResponseDto;
  tokenExpiry: number;

  constructor(
    accessToken: string,
    refreshToken: string,
    user: UserResponseDto,
    tokenExpiry: number,
  ) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
    this.tokenExpiry = tokenExpiry;
  }
}
