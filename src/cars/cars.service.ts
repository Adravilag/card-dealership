import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CarsService {

    // Mock data for demonstration purposes
    private readonly cars = [
        { id: 1, brand: 'Toyota', model: 'Corolla', year: 2020 },   
        { id: 2, brand: 'Honda', model: 'Civic', year: 2019 },
        { id: 3, brand: 'Ford', model: 'Mustang', year: 2021 },
    ];

    findAll() {
        return this.cars;
    }

    findById(id: number) {
        const car = this.cars.find(car => car.id === id);
        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return car;
    }

    create(car: any) {
        const newCar = { id: this.cars.length + 1, ...car };
        this.cars.push(newCar);
        return newCar;
    }

    update(id: number, car: any) {
        const index = this.cars.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        this.cars[index] = { ...this.cars[index], ...car };
        return this.cars[index];
    }

    delete(id: number) {
        const index = this.cars.findIndex(c => c.id === id);
        if (index === -1) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        this.cars.splice(index, 1);
        return { message: `Car with ID ${id} deleted` };
    }

}   
