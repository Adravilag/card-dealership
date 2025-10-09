import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {

  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name is too short' })
  name: string;
    
}
