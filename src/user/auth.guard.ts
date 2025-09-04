import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
import { AccountStatus } from './enum/user.enum';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    let token = request.headers.authorization ?? '';

    if (!token) {
      throw new UnauthorizedException('Authorization failed');
    }

    try {
      token = token.split(' ')[1];
      const decoded: any = this.jwtService.verify(token, { secret: process.env.JWT_KEY });

      if (decoded && decoded.id) {
        const user = await this.userService.getUserByField({ id: decoded.id });
        if (!user) {
          throw new UnauthorizedException('Authorization failed');
        }

        switch (user.accountStatus) {
          case AccountStatus.DELETED:
            throw new UnauthorizedException('Account does not exist');
          case AccountStatus.SUSPENDED:
            throw new UnauthorizedException('Account suspended');
          case AccountStatus.FROZEN:
            throw new UnauthorizedException('Account frozen');
        }
      }

      request.body.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Authorization failed');
    }
  }
}
