import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';
import { ResponseCode } from 'src/user/enum/user.enum';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: Repository<Account>,
  ) {}

  private generateAccountNumber(): string {
    let accountNumber = '';
    for (let i = 0; i < 10; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
  }

  private async createUniqueAccountNumber(): Promise<string> {
    let accountNo = '';
    while (!accountNo) {
      const candidate = this.generateAccountNumber();
      const exists = await this.accountRepo.findOne({
        where: { accountNumber: candidate },
      });
      if (!exists) {
        accountNo = candidate;
      }
    }
    return accountNo;
  }

  async createAccount(userId: string, type: string) {
    const accountNumber = await this.createUniqueAccountNumber();

    const account = this.accountRepo.create({
      user: { id: userId },
      accountNumber,
      type,
      balance: 0,
      status: 'ACTIVE',
    });

    const saved = await this.accountRepo.save(account);

    return {
      code: ResponseCode.SUCCESS,
      message: 'Account created successfully',
      data: { account: saved },
    };
  }
}
