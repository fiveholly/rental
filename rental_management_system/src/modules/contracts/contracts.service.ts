import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from '../../entities/contract.entity';
import { Repository, DataSource } from 'typeorm';
import { Property } from '../../entities/property.entity';
import { Bill } from '../../entities/bill.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(Contract) private repo: Repository<Contract>,
    @InjectRepository(Property) private propRepo: Repository<Property>,
    @InjectRepository(Bill) private billRepo: Repository<Bill>,
    private dataSource: DataSource
  ) {}

  private async generateContractNo() {
    const prefix = 'CT';
    const ts = Date.now();
    return `${prefix}${ts}`;
  }

  async createContract(dto: any, creatorId: number) {
    return this.dataSource.transaction(async manager => {
      const property = await manager.findOne(Property, { where: { id: dto.property_id } });
      if (!property) throw new BadRequestException('Property not found');
      if (property.status !== 'vacant') throw new BadRequestException('Property not vacant');

      const contract = new Contract();
      contract.contract_no = await this.generateContractNo();
      contract.property = property as any;
      contract.tenant = { id: dto.tenant_id } as any;
      contract.start_date = dto.start_date;
      contract.end_date = dto.end_date;
      contract.rent_amount = dto.rent_amount;
      contract.deposit_amount = dto.deposit_amount;
      contract.payment_method = dto.payment_method;
      contract.payment_day_offset = dto.payment_day_offset || 0;
      contract.status = 'active';
      contract.created_by = { id: creatorId } as any;

      const saved = await manager.save(Contract, contract);

      property.status = 'rented';
      await manager.save(property);

      // generate first bill
      const firstBill = new Bill();
      firstBill.contract = saved as any;
      firstBill.bill_type = 'rent';
      firstBill.period_start = dto.start_date;
      // For simplicity assume monthly periods: period_end = start_date + 1 month -1 day
      const periodEnd = dayjs(dto.start_date).add(1, 'month').subtract(1, 'day');
      firstBill.period_end = periodEnd.format('YYYY-MM-DD');
      const dueDate = dayjs(firstBill.period_start).subtract(contract.payment_day_offset, 'day');
      firstBill.due_date = dueDate.format('YYYY-MM-DD');
      firstBill.due_amount = dto.rent_amount;
      firstBill.status = 'unpaid';
      await manager.save(firstBill);

      return saved;
    });
  }
}
