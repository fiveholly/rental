import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Property } from './property.entity';
import { Tenant } from './tenant.entity';

@Entity({ name: 'maintenance_requests' })
export class MaintenanceRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Property, p => p.maintenanceRequests, { eager: false })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @ManyToOne(() => Tenant, t => t.maintenanceRequests, { eager: false })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @Column({ length: 50 })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'json', nullable: true })
  photos: string[] | null;

  @Column({ type: 'enum', enum: ['pending','processing','completed'], default: 'pending' })
  status: string;

  @Column({ type: 'text', nullable: true })
  result: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
