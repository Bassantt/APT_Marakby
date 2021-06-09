import { IsOptional, Length, IsNumber, Min, Max } from 'class-validator';
export class BookingDto {
  @IsOptional()
  bookDate?: string;
  @IsOptional()
  @IsNumber()
  salary?: Number;
  @IsOptional()
  availableFunctions?: [string];
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  fromHour?: Number;
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(24)
  endHour?: Number;
}

