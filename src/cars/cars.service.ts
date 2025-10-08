import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dtos';

@Injectable()
export class CarsService {

    // Mock data for demonstration purposes
    private readonly cars : Car[] = [
        { id: uuidv4(), brand: 'Toyota', model: 'Corolla', year: 2020 },   
        { id: uuidv4(), brand: 'Honda', model: 'Civic', year: 2019 },
        { id: uuidv4(), brand: 'Ford', model: 'Mustang', year: 2021 },
    ];

    findAll() {
        return this.cars;
    }

    findById(id: string) : Car {
        const car = this.cars.find(car => car.id === id);
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }

    create(createCarDto: CreateCarDto): Car {
        const newCar: Car = {id: uuidv4(), ...createCarDto}
        this.cars.push(newCar);
        return newCar;
    }

    update(id: string, updateCarDto: UpdateCarDto): Car {
        const index = this.cars.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        this.cars[index] = { ...this.cars[index], ...updateCarDto };
        return this.cars[index];
    }

    delete(id: string) : { message: string } {
        const index = this.cars.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        this.cars.splice(index, 1);
        return { message: `Car with ID ${id} deleted` };
    }

}   
