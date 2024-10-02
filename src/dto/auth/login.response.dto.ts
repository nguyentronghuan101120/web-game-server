export class LoginResponseDto {
  accessToken: string;

  constructor(username: string, accessToken: string) {
    this.accessToken = accessToken;
  }
}
