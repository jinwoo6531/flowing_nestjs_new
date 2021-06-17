import { SignInDto } from './dtos/signin.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { StoresRepository } from './stores.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(StoresRepository)
    private storesRepository: StoresRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.storesRepository.crateStore(authCredentialsDto);
  }

  async signIn(
    signInDto: SignInDto,
  ): Promise<{ accessToken: string; store_name: string; isLoggedIn: boolean }> {
    const { store_name, store_password } = signInDto;
    const store = await this.storesRepository.findOne({ store_name });

    if (store && (await bcrypt.compare(store_password, store.store_password))) {
      const payload: JwtPayload = { store_name };
      const accessToken: string = await this.jwtService.sign(payload);
      return {
        accessToken,
        store_name,
        isLoggedIn: true,
      };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
