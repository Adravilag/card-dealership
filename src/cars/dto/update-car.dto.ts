import { IsNumber, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export class UpdateCarDto {
    
    @IsString({ message: 'ID must be a string' })
    @IsUUID('4', { message: 'ID must be a valid UUIDv4' })
    @IsOptional({ message: 'ID is required' })
    readonly id?: string;

    @IsString({ message: 'Brand must be a string' })
    @IsOptional()
    readonly brand?: string;

    @IsString({ message: 'Model must be a string' })
    @IsOptional()
    readonly model?: string;

    @IsNumber({}, { message: 'Year must be a number' })
    @IsOptional()
    readonly year?: number;
};