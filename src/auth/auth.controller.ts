import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dtos/auth-credentials.dto';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(
    @Body() signInDto: SignInDto,
  ): Promise<{ accessToken: string; store_name: string; isLoggedIn: boolean }> {
    return this.authService.signIn(signInDto);
  }

  @Get('store')
  async store(@Req() request: Request) {
    console.log(request);
  }
}
