import { Module } from '@nestjs/common';
import { AccountService } from './accounts.service';      // <-- singular
import { AccountController } from './accounts.controller'; // <-- singular
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { UserModule } from 'src/user/user.module';

@Module({
   imports: [
      TypeOrmModule.forFeature([Account]),
      UserModule,
      
    ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountsModule {}
