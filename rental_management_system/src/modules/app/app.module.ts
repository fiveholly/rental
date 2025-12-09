import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { PropertiesModule } from '../properties/properties.module';
import { TenantsModule } from '../tenants/tenants.module';
import { ContractsModule } from '../contracts/contracts.module';
import { BillsModule } from '../bills/bills.module';
import { MaintenanceModule } from '../maintenance/maintenance.module';
import { User } from '../../entities/user.entity';
import { Property } from '../../entities/property.entity';
import { Tenant } from '../../entities/tenant.entity';
import { Contract } from '../../entities/contract.entity';
import { Bill } from '../../entities/bill.entity';
import { MaintenanceRequest } from '../../entities/maintenance.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'rental_db',
      entities: [User, Property, Tenant, Contract, Bill, MaintenanceRequest],
      synchronize: false,
      timezone: '+08:00'
    }),
    ScheduleModule.forRoot(),
    AuthModule,
    UsersModule,
    PropertiesModule,
    TenantsModule,
    ContractsModule,
    BillsModule,
    MaintenanceModule
  ]
})
export class AppModule {}
