import { IsEmail, IsNotEmpty, MinLength, IsString, IsUUID, IsEnum } from 'class-validator';
import { AccountStatus } from '../enum/user.enum';


// Register DTO
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// // Login DTO
// export class LoginDto {
//   @IsEmail()
//   email: string;

//   @IsString()
//   @MinLength(6)
//   password: string;
// }

// Forgot Password DTO
export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

// Reset Password DTO
export class ResetPasswordDto {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// Set Account Status DTO
export class SetAccountStatusDto {
  @IsUUID()
  userId: string;

  @IsEnum(AccountStatus)
  status: AccountStatus;
}
