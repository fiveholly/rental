import { IsNotEmpty, IsNumber, IsString, IsDateString, IsInt, IsOptional } from 'class-validator';

export class CreateContractDto {
  @IsNumber()
  property_id: number;

  @IsNumber()
  tenant_id: number;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsNotEmpty()
  @IsString()
  payment_method: string;

  @IsNumber()
  rent_amount: number;

  @IsNumber()
  deposit_amount: number;

  @IsInt()
  @IsOptional()
  payment_day_offset?: number;
}
