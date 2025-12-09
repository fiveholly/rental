import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Contract } from './contract.entity';
import { MaintenanceRequest } from './maintenance.entity';

@Entity({ name: 'properties' })
export class Property {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  address: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  area: string;

  @Column({ length: 50 })
  layout: string;

  @Column({ type: 'json', nullable: true })
  facilities: any;

  @Column({ type: 'enum', enum: ['vacant','rented','decorating','terminated'], default: 'vacant' })
  status: string;

  @Column({ type: 'json', nullable: true })
  landlord_info: any;

  @OneToMany(() => Contract, c => c.property)
  contracts: Contract[];

  @OneToMany(() => MaintenanceRequest, m => m.property)
  maintenanceRequests: MaintenanceRequest[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
