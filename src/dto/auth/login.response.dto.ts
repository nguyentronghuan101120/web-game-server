export class LoginResponseDto {
  accessToken: string;
  username: string;

  constructor(username: string, accessToken: string) {
    this.accessToken = accessToken;
    this.username = username;
  }
}
