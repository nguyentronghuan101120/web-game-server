import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserEntity } from 'src/entities/user.entities';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), UserModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
