import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Contract } from './contract.entity';
import { MaintenanceRequest } from './maintenance.entity';

@Entity({ name: 'tenants' })
export class Tenant {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ length: 50 })
  real_name: string;

  @Column({ length: 20 })
  id_card_no: string;

  @Column({ length: 20 })
  mobile: string;

  @Column({ type: 'json', nullable: true })
  emergency_contact: any;

  @Column({ type: 'int', default: 1 })
  occupant_count: number;

  @Column({ type: 'json', nullable: true })
  id_card_photos: string[] | null;

  @Column({ length: 50, nullable: true })
  source: string | null;

  @OneToMany(() => Contract, c => c.tenant)
  contracts: Contract[];

  @OneToMany(() => MaintenanceRequest, m => m.tenant)
  maintenanceRequests: MaintenanceRequest[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
