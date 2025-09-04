import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Token } from './entities/token.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class TokenService {
  constructor(
    @InjectRepository(Token)
    private readonly tokenRepo: Repository<Token>,
  ) {}

  // enums for token types and status
  public TokenTypes = {
    FORGOT_PASSWORD: 'FORGOT_PASSWORD',
    VERIFY_EMAIL: 'VERIFY_EMAIL',
  } as const;

  public TokenStatus = {
    NOTUSED: 'NOTUSED',
    USED: 'USED',
  } as const;

  async createForgotPasswordToken(email: string): Promise<Token> {
  const code = randomBytes(3).toString('hex'); // 6-char random code

  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 15); // valid for 15 minutes

  const token = this.tokenRepo.create({
    email,
    code,
    type: this.TokenTypes.FORGOT_PASSWORD,
    status: this.TokenStatus.NOTUSED,
    expires,
  });

  return this.tokenRepo.save(token);
}

  async getTokenByField(where: Partial<Token>) {
    return this.tokenRepo.findOne({ where });
  }

  async updateRecord(where: Partial<Token>, update: Partial<Token>) {
    await this.tokenRepo.update(where, update);
  }
}
