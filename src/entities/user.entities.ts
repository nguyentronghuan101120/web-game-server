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
  name: string | null;

  @Column({ nullable: true })
  phone: string | null;

  @Column({ nullable: true, unique: true })
  email: string | null;

  @Column({ nullable: true })
  status: string | null;

  @Column({ default: true })
  activated: number;

  @Column({ nullable: true, name: 'remember_token' })
  rememberToken: string | null;

  @Column({ type: 'decimal', default: 0 })
  balance: number;

  @Column({ type: 'decimal', default: 0 })
  luong: number;

  @Column({ type: 'decimal', default: 0 })
  tongnap: number;

  @Column({ nullable: true })
  online: boolean;

  @Column({ default: 0, nullable: true })
  role: number;

  @Column({ name: 'group_id', nullable: true })
  groupId: string;

  @Column({ type: 'timestamp', nullable: true, name: 'last_login_at' })
  lastLoginAt: Date | null;

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

  @Column({ type: 'decimal', default: 0, name: 'efffan' })
  effFan: number;

  @Column({ type: 'decimal', default: 0, name: 'effvip' })
  effVip: number;

  @Column({ type: 'decimal', default: 0, name: 'efftop' })
  effTop: number;

  @Column({ type: 'decimal', default: 0, name: 'effytb' })
  effYtb: number;

  @Column({ type: 'decimal', default: 0, name: 'effdg' })
  effDg: number;

  @Column({ type: 'decimal', default: 0, name: 'effygt' })
  effYgt: number;

  @Column({ type: 'decimal', default: 0, name: 'effydc' })
  effYdc: number;

  @Column({ type: 'decimal', default: 0, name: 'effydh' })
  effYdh: number;

  @Column({ type: 'decimal', default: 0, name: 'amount_unpaid' })
  amountUnpaid: number;

  @Column({ type: 'decimal', default: 0, name: 'mcs' })
  mcs: number;

  @Column({ type: 'decimal', default: 0, name: 'vip' })
  vip: number;

  @Column({ type: 'decimal', default: 0, name: 'vnd' })
  vnd: number;

  @Column({ type: 'decimal', default: 0, name: 'mocvip' })
  mocVip: number;

  @Column({ type: 'decimal', default: 0, name: 'nhanmocnap' })
  nhanMocNap: number;

  @Column({ type: 'decimal', default: 0, name: 'rewardtop' })
  rewardTop: number;
}
