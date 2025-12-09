import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from '../../entities/contract.entity';
import { Property } from '../../entities/property.entity';
import { Bill } from '../../entities/bill.entity';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Contract, Property, Bill])],
  providers: [ContractsService],
  controllers: [ContractsController],
  exports: [ContractsService]
})
export class ContractsModule {}
