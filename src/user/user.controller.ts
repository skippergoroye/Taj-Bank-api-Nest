import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, SetAccountStatusDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    return this.userService.register(body);
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.userService.forgotPassword(body);
  }

  @Post('reset-password')
  async resetPassword(@Body() body: ResetPasswordDto) {
    return this.userService.resetPassword(body);
  }

  @Post('set-account-status')
  async setAccountStatus(@Body() body: SetAccountStatusDto) {
    return this.userService.setAccountStatus(body);
  }
}
