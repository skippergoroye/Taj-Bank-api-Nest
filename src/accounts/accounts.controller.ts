// import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
// import { CreateAccountDto } from './dto/create-account.dto';
// import { Request } from 'express';
// import { AccountService } from './accounts.service';
// import { AuthGuard } from 'src/user/auth.guard';

// @Controller('accounts')
// export class AccountController {
//   constructor(private readonly accountService: AccountService) {}

//   @Post('create-account')
//   @UseGuards(AuthGuard)
//   async createAccount(@Body() dto: CreateAccountDto, @Req() req: Request) {
//     return this.accountService.createAccount(req.user.id, dto.type);
//   }
// }


import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import type { Request } from 'express';  // <--- change here
import { AccountService } from './accounts.service';
import { AuthGuard } from 'src/user/auth.guard';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('create-account')
  @UseGuards(AuthGuard)
  async createAccount(@Body() dto: CreateAccountDto, @Req() req: Request) {
    return this.accountService.createAccount(req.body.user.id, dto.type);
  }
}

