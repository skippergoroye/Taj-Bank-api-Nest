import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string; // Foreign key

  @ManyToOne(() => User, (user) => user.accounts, { onDelete: 'CASCADE' }) //"Many of me (Accounts) can belong to one User." 
  @JoinColumn({ name: 'userId' }) //{ onDelete: 'CASCADE' } "If you delete the User, also delete all their Accounts automatically."
  user: User;

  @Column({ unique: true })
  accountNumber: string;

  @Column({ type: 'decimal', precision: 30, scale: 2, default: 0 })
  balance: number;

  @Column()
  type: string;

  @Column()
  status: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
