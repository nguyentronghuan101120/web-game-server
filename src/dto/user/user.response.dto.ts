export class UserResponseDto {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: number;
  lastLoginWebAt: Date;
  activated: number;
}
