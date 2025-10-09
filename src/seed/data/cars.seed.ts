import { Car } from "src/cars/interfaces/car.interface";
import { v4 as uuidv4 } from 'uuid';

export const CARS_SEED: Car[] = [
    { id: uuidv4(), brand: 'Toyota', model: 'Corolla', year: 2020 },
    { id: uuidv4(), brand: 'Honda', model: 'Civic', year: 2019 },
    { id: uuidv4(), brand: 'Ford', model: 'Mustang', year: 2021 },
];
