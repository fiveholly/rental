import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { MaintenanceService } from './maintenance.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('maintenance')
export class MaintenanceController {
  constructor(private ms: MaintenanceService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() body: any, @Request() req: any) {
    const tenantId = body.tenant_id || req.user.userId;
    return this.ms.create({ ...body, tenant: { id: tenantId } });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mine')
  myRequests(@Request() req: any) {
    return this.ms.findByTenant(req.user.userId);
  }
}
