import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ unique: true })
  email: string | null;

  @Column({ nullable: true })
  status: string | null;

  @Column({ default: 1, nullable: true })
  activated: number;

  @Column({ nullable: true, name: 'remember_token' })
  rememberToken: string | null;

  @Column({ type: 'decimal', default: 0, nullable: true })
  balance: number;

  @Column({ type: 'decimal', default: 0, nullable: true })
  luong: number;

  @Column({ type: 'decimal', default: 0, nullable: true })
  tongnap: number;

  @Column({ nullable: true })
  online: boolean;

  @Column({ default: 0, nullable: true })
  role: number;

  @Column({ name: 'group_id', nullable: true })
  groupId: string;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
  lastLoginAt: Date | null;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_web_at' })
  lastLoginWebAt: Date | null;

  @Column({ name: 'received_first_gift', nullable: true })
  receivedFirstGift: boolean;

  @Column({ type: 'bigint', nullable: true, name: 'last_attendance_at' })
  lastAttendanceAt: number | null;

  @Column({ type: 'simple-array', name: 'ip_address', nullable: true })
  ipAddress: string[];

  @Column({ type: 'simple-array', name: 'level_reward', nullable: true })
  levelReward: number[];

  @Column({ nullable: true })
  note: string | null;

  @Column({ type: 'timestamp', nullable: true, name: 'ban_until' })
  banUntil: Date | null;

  @Column({ type: 'timestamp', name: 'created_at', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true, name: 'updated_at' })
  updatedAt: Date | null;

  @Column({ nullable: true })
  kh: string;

  @Column({ nullable: true })
  tempCode: string | null;

  @Column({ type: 'decimal', default: 0, name: 'efffan', nullable: true })
  effFan: number;

  @Column({ type: 'decimal', default: 0, name: 'effvip', nullable: true })
  effVip: number;

  @Column({ type: 'decimal', default: 0, name: 'efftop', nullable: true })
  effTop: number;

  @Column({ type: 'decimal', default: 0, name: 'effytb', nullable: true })
  effYtb: number;

  @Column({ type: 'decimal', default: 0, name: 'effdg', nullable: true })
  effDg: number;

  @Column({ type: 'decimal', default: 0, name: 'effygt', nullable: true })
  effYgt: number;

  @Column({ type: 'decimal', default: 0, name: 'effydc', nullable: true })
  effYdc: number;

  @Column({ type: 'decimal', default: 0, name: 'effydh', nullable: true })
  effYdh: number;

  @Column({
    type: 'decimal',
    default: 0,
    name: 'amount_unpaid',
    nullable: true,
  })
  amountUnpaid: number;

  @Column({ type: 'decimal', default: 0, name: 'mcs', nullable: true })
  mcs: number;

  @Column({ type: 'decimal', default: 0, name: 'vip', nullable: true })
  vip: number;

  @Column({ type: 'decimal', default: 0, name: 'vnd', nullable: true })
  vnd: number;

  @Column({ type: 'decimal', default: 0, name: 'mocvip', nullable: true })
  mocVip: number;

  @Column({ type: 'decimal', default: 0, name: 'nhanmocnap', nullable: true })
  nhanMocNap: number;

  @Column({ type: 'decimal', default: 0, name: 'rewardtop', nullable: true })
  rewardTop: number;
}
