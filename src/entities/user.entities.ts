import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @Column()
  activated: boolean;

  @Column()
  rememberToken: string;

  @Column()
  balance: number;

  @Column()
  luong: number;

  @Column()
  tongnap: number;

  @Column()
  online: boolean;

  @Column()
  role: string;

  @Column()
  groupId: string;

  @Column()
  lastLoginAt: Date;

  @Column()
  receivedFirstGift: boolean;

  @Column()
  lastAttendanceAt: Date;

  @Column()
  ipAddress: string;

  @Column()
  levelReward: number;

  @Column()
  note: string;

  @Column()
  banUntil: Date;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column()
  kh: string;

  @Column()
  tempCode: string;

  @Column()
  efffan: number;

  @Column()
  effvip: number;

  @Column()
  efftop: number;

  @Column()
  effytb: number;

  @Column()
  effdg: number;

  @Column()
  effygt: number;

  @Column()
  effydc: number;

  @Column()
  effydh: number;

  @Column()
  amountUnpaid: number;

  @Column()
  mcs: number;

  @Column()
  vip: number;

  @Column()
  vnd: number;

  @Column()
  mocvip: number;

  @Column()
  nhanmocnap: number;

  @Column()
  rewardtop: number;
}
