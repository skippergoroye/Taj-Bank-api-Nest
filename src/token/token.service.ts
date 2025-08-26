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

  async createForgotPasswordToken(email: string): Promise<Token> {
    const code = randomBytes(3).toString('hex'); // 6-char random code
    const token = this.tokenRepo.create({ email, code });
    return this.tokenRepo.save(token);
  }
}
