import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  type: string;
}
