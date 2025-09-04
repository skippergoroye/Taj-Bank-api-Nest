import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto,  ResetPasswordDto, SetAccountStatusDto } from './dto/user.dto';
import { LoginDto } from './dto/login.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const user = await this.userService.register(body);
    return { status: true, message: 'User registered successfully', data: user };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return this.userService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }

}
