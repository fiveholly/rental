import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MaintenanceRequest } from '../../entities/maintenance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MaintenanceService {
  constructor(@InjectRepository(MaintenanceRequest) private repo: Repository<MaintenanceRequest>) {}

  create(data: Partial<MaintenanceRequest>) {
    const m = this.repo.create(data);
    return this.repo.save(m);
  }

  findByTenant(tenantId: number) {
    return this.repo.find({ where: { tenant: { id: tenantId } } as any });
  }
}
