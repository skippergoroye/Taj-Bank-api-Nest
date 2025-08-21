import { Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto, ForgotPasswordDto, ResetPasswordDto, SetAccountStatusDto } from './dto/user.dto';
import { ResponseCode } from './enum/user.enum';
// import { ResponseCode } from './user.enum';

@Injectable()
export class UserService {
  async register(data: RegisterDto) {
    return { code: ResponseCode.SUCCESS, message: 'Registration successful', data };
  }

  async login(data: LoginDto) {
    return { code: ResponseCode.SUCCESS, message: 'Login successful', data };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    return { code: ResponseCode.SUCCESS, message: 'Forgot password request received', data };
  }

  async resetPassword(data: ResetPasswordDto) {
    return { code: ResponseCode.SUCCESS, message: 'Password reset successful', data };
  }

  async setAccountStatus(data: SetAccountStatusDto) {
    return { code: ResponseCode.SUCCESS, message: 'Account status updated', data };
  }
}
