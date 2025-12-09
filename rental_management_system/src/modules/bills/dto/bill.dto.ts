import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class BillDto {
  @IsNumber()
  contract_id: number;

  @IsString()
  bill_type: string;

  @IsOptional()
  @IsDateString()
  period_start?: string;

  @IsOptional()
  @IsDateString()
  period_end?: string;

  @IsDateString()
  due_date: string;

  @IsNumber()
  due_amount: number;
}
