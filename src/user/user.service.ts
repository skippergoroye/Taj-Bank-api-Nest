import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  RegisterDto,
  ResetPasswordDto,
  SetAccountStatusDto,
} from './dto/user.dto';
import {
  AccountStatus,
  EmailStatus,
  ResponseCode,
  UserRoles,
} from './enum/user.enum';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import * as jwt from 'jsonwebtoken';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { TokenService } from 'src/token/token.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
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
    savedUser.password = ''; // Do not return password in response
    return savedUser;
  }

  async login(data: LoginDto) {
    const { email, password } = data;

    // find user
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('Invalid login details');
    }

    // compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid login details');
    }

    // generate token
    const token = jwt.sign(
      {
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: '30d' },
    );

    // don’t expose password
    user.password = '';

    return {
      code: ResponseCode.SUCCESS,
      message: 'Login successful',
      data: { user, token },
    };
  }


  async forgotPassword(email: string) {
    const user = await this.userRepo.findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundException('Account does not exist');
    }

    const token = await this.tokenService.createForgotPasswordToken(email);
    await this.emailService.sendForgotPasswordMail(email, token.code);
    return {
      message: 'Password reset code has been sent to your mail',
      data: { email: email },
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
