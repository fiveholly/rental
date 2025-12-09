import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm';
import { Tenant } from './tenant.entity';

export type UserRole = 'admin' | 'landlord' | 'tenant';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20, unique: true, nullable: true })
  mobile: string | null;

  @Column({ type: 'enum', enum: ['admin', 'landlord', 'tenant'], default: 'tenant' })
  role: UserRole;

  @OneToOne(() => Tenant, tenant => tenant.user, { nullable: true })
  tenant?: Tenant;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
