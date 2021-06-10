import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresRepository } from './stores.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StoresRepository])],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
