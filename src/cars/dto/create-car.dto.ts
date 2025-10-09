import { IsNotEmpty, IsNumber, IsString, Max, Min } from "class-validator";

export class CreateCarDto {
    @IsString({ message: 'Brand must be a string' })
    @IsNotEmpty({ message: 'Brand is required' })
    readonly brand: string;

    @IsString({ message: 'Model must be a string' })
    @IsNotEmpty({ message: 'Model is required' })
    readonly model: string;

    @IsNumber({}, { message: 'Year must be a number' })
    @Min(1886, { message: 'Year must be at least 1886' })
    @Max( new Date().getFullYear(), { message: `Year cannot be in the future` } )
    readonly year: number;

};