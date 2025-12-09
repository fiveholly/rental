import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from '../../entities/bill.entity';
import { Contract } from '../../entities/contract.entity';
import { ContractsModule } from '../contracts/contracts.module';
import { BillsService } from './bills.service';

@Module({
  imports: [TypeOrmModule.forFeature([Bill, Contract]), ContractsModule],
  providers: [BillsService],
  exports: [BillsService]
})
export class BillsModule {}
