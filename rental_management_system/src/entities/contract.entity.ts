import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Property } from './property.entity';
import { Tenant } from './tenant.entity';
import { User } from './user.entity';

@Entity({ name: 'contracts' })
export class Contract {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, unique: true })
  contract_no: string;

  @ManyToOne(() => Property, p => p.contracts, { eager: false })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Tenant, t => t.contracts, { eager: false })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ type: 'date' })
  start_date: string;

  @Column({ type: 'date' })
  end_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  rent_amount: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  deposit_amount: string;

  @Column({ length: 50 })
  payment_method: string;

  @Column({ type: 'int', default: 0 })
  payment_day_offset: number;

  @Column({ type: 'enum', enum: ['active','expired','terminated'], default: 'active' })
  status: string;

  @Column({ type: 'json', nullable: true })
  attachments: any;

  @Column({ type: 'json', nullable: true })
  termination_info: any;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
