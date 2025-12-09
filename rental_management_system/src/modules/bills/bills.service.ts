import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contract } from '../../entities/contract.entity';
import { Bill } from '../../entities/bill.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Contract) private contractRepo: Repository<Contract>,
    @InjectRepository(Bill) private billRepo: Repository<Bill>,
  ) {}

  // Run daily at 00:00
  @Cron('0 0 0 * * *')
  async handleCron() {
    const today = dayjs().format('YYYY-MM-DD');
    const activeContracts = await this.contractRepo.find({ where: { status: 'active' } });
    for (const c of activeContracts) {
      // find last rent bill
      const lastBill = await this.billRepo.findOne({ where: { contract: { id: c.id }, bill_type: 'rent' }, order: { period_end: 'DESC' } as any });
      let nextStart;
      if (!lastBill) {
        nextStart = dayjs(c.start_date);
      } else {
        nextStart = dayjs(lastBill.period_end).add(1, 'day');
      }
      const nextDueDate = dayjs(nextStart).subtract(c.payment_day_offset || 0, 'day');
      if (dayjs(today).isAfter(nextDueDate) || dayjs(today).isSame(nextDueDate)) {
        if (nextStart.isBefore(dayjs(c.end_date))) {
          // simplistic monthly period calculation based on payment_method (e.g., 押一付三 => 3 months)
          const months = c.payment_method.includes('三') ? 3 : 1;
          let periodEnd = nextStart.add(months, 'month').subtract(1, 'day');
          if (periodEnd.isAfter(dayjs(c.end_date))) periodEnd = dayjs(c.end_date);
          const bill = new Bill();
          bill.contract = { id: c.id } as any;
          bill.bill_type = 'rent';
          bill.period_start = nextStart.format('YYYY-MM-DD');
          bill.period_end = periodEnd.format('YYYY-MM-DD');
          bill.due_date = nextDueDate.format('YYYY-MM-DD');
          bill.due_amount = c.rent_amount as any;
          bill.status = 'unpaid';
          await this.billRepo.save(bill);
        }
      }
    }
  }
}
