import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars : Car[] = [];

    findAll() {
        return this.cars;
    }

    findById(id: string) : Car {
        const car = this.cars.find(car => car.id === id);
        if (!car) {
            throw new NotFoundException(`Car with ID '${id}' not found`);
        }
        return car;
    }

    create(createCarDto: CreateCarDto): Car {
        // Validar que no exista un carro con la misma marca, modelo y año
        const existingCar = this.cars.find(car => 
            car.brand.toLowerCase() === createCarDto.brand.toLowerCase() &&
            car.model.toLowerCase() === createCarDto.model.toLowerCase() &&
            car.year === createCarDto.year
        );

        if (existingCar) {
            throw new BadRequestException(`Car ${createCarDto.brand} ${createCarDto.model} ${createCarDto.year} already exists`);
        }

        const newCar: Car = {id: uuidv4(), ...createCarDto}
        this.cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto): Car {
        const index = this.cars.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Car with ID '${id}' not found`);
        }
        this.cars[index] = { ...this.cars[index], ...updateCarDto };
        return this.cars[index];
    }

    delete(id: string) : { message: string } {
        const index = this.cars.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Car with ID '${id}' not found`);
        }
        this.cars.splice(index, 1);
        return { message: `Car with ID '${id}' deleted successfully` };
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }

}   
