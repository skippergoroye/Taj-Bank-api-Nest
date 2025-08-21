import { Injectable, ConflictException } from '@nestjs/common';
import {
  RegisterDto,
  LoginDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  SetAccountStatusDto,
} from './dto/user.dto';
import { AccountStatus, EmailStatus, ResponseCode, UserRoles } from './enum/user.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async register(data: RegisterDto): Promise<Partial<User>> {
    const { firstname, lastname, email, password } = data;

    // check if user exists
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // build user
    const user = this.userRepo.create({
      firstname,
      lastname,
      email,
      username: email.split('@')[0],
      password: await bcrypt.hash(password, 10),
      role: UserRoles.CUSTOMER,
      isEmailVerified: EmailStatus.NOT_VERIFIED,
      accountStatus: AccountStatus.ACTIVE,
    });

    const savedUser = await this.userRepo.save(user);
    savedUser.password = ""; // Do not return password in response
    return savedUser;
  }

  async login(data: LoginDto) {
    return { code: ResponseCode.SUCCESS, message: 'Login successful', data };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    return {
      code: ResponseCode.SUCCESS,
      message: 'Forgot password request received',
      data,
    };
  }

  async resetPassword(data: ResetPasswordDto) {
    return {
      code: ResponseCode.SUCCESS,
      message: 'Password reset successful',
      data,
    };
  }

  async setAccountStatus(data: SetAccountStatusDto) {
    return {
      code: ResponseCode.SUCCESS,
      message: 'Account status updated',
      data,
    };
  }
}
