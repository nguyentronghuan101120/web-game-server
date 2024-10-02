export class LoginResponseDto {
  username: string;
  accessToken: string;

  constructor(username: string, accessToken: string) {
    this.username = username;
    this.accessToken = accessToken;
  }
}
