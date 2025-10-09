import { IsString, MinLength } from 'class-validator';

export class CreateBrandDto {

  @IsString({ message: 'Name must be a string' })
  @MinLength(2, { message: 'Name is too short' })
  name: string;

}
