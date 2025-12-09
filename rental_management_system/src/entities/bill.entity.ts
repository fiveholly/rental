import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Contract } from './contract.entity';

@Entity({ name: 'bills' })
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Contract, { eager: false })
  @JoinColumn({ name: 'contract_id' })
  contract: Contract;

  @Column({ type: 'enum', enum: ['rent','property_fee','water','electricity','other'], default: 'rent' })
  bill_type: string;

  @Column({ type: 'date', nullable: true })
  period_start: string | null;

  @Column({ type: 'date', nullable: true })
  period_end: string | null;

  @Column({ type: 'date' })
  due_date: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  due_amount: string;

  @Column({ type: 'date', nullable: true })
  paid_date: string | null;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0.00 })
  paid_amount: string;

  @Column({ type: 'enum', enum: ['unpaid','paid','overdue'], default: 'unpaid' })
  status: string;

  @Column({ length: 50, nullable: true })
  payment_channel: string | null;

  @Column({ length: 100, nullable: true })
  transaction_id: string | null;

  @Column({ length: 255, nullable: true })
  payment_voucher: string | null;

  @Column({ length: 255, nullable: true })
  notes: string | null;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
