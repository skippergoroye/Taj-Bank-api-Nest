import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  code: string;

  @Column({ default: 'FORGOT_PASSWORD' }) // or VERIFY_EMAIL
  type: string;

  @Column({ default: 'NOTUSED' }) // or USED
  status: string;

  @Column()
  expires: Date;

  @CreateDateColumn()
  createdAt: Date;
}
