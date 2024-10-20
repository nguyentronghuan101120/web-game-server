import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
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

  @Column({ default: 1 })
  status: number;

  @Column({ default: 1, nullable: true })
  activated: number;

  @Column({ nullable: true, name: 'remember_token' })
  rememberToken: string | null;

  @Column({ type: 'decimal', default: 0, nullable: true })
  balance: number;

  @Column({ type: 'int', width: 11, default: 0 })
  luong: number;

  @Column({ type: 'decimal', default: 0, nullable: true })
  tongnap: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  online: number;

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

  @Column({
    type: 'varchar',
    length: 30,
    name: 'level_reward',
    default: '[0,0,0,0,0]',
  })
  levelReward: string; // Changed from number[] to string

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

  @Column({ type: 'int', width: 11, default: 0, name: 'efffan' })
  effFan: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'effvip' })
  effVip: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'efftop' })
  effTop: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'effytb' })
  effYtb: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'effdg' })
  effDg: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'effygt' })
  effYgt: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'effydc' })
  effYdc: number;

  @Column({ type: 'int', width: 11, default: 0, name: 'effydh' })
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

  @Column({
    type: 'int',
    width: 11,
    default: 0,
    name: 'nhanmocnap',
  })
  nhanMocNap: number;

  @Column({ type: 'decimal', default: 0, name: 'rewardtop', nullable: true })
  rewardTop: number;
}
