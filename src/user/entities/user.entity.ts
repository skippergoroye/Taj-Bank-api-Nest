import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { EmailStatus, UserRoles, AccountStatus } from '../enum/user.enum';
import { Account } from 'src/accounts/entities/account.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.CUSTOMER })
  role: UserRoles;

  @Column({
    type: 'enum',
    enum: EmailStatus,
    default: EmailStatus.NOT_VERIFIED,
  })
  isEmailVerified: EmailStatus;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.ACTIVE,
  })
  accountStatus: AccountStatus;

  @OneToMany(() => Account, (account) => account.user) //one user to many accounts "One User can have many Accounts."
  accounts: Account[]; 

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
