import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('contracts')
export class ContractsController {
  constructor(private contracts: ContractsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateContractDto, @Request() req: any) {
    const user = req.user;
    return this.contracts.createContract(dto, user?.userId || 0);
  }
}
