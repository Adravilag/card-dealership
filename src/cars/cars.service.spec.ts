import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dtos';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Additional tests can be added here
  it('should return all cars', () => {
    const result = service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return a car by ID', () => {
    // Obtenemos un ID válido de los datos mock
    const allCars = service.findAll();
    const validCarId = allCars[0].id;
    const result = service.findById(validCarId);
    expect(result).toBeDefined();
    expect(result.id).toBe(validCarId);
  });

  it('should create a new car', () => {
    const newCarData: CreateCarDto = { brand: 'Chevrolet', model: 'Camaro', year: 2022 };
    const result = service.create(newCarData);
    expect(result).toBeDefined();
    expect(result.brand).toBe(newCarData.brand);
    expect(result.model).toBe(newCarData.model);
    expect(result.year).toBe(newCarData.year);
    expect(result.id).toBeDefined(); // Debe tener un ID generado automáticamente
  });

  it('should update a car by ID', () => {
    // Primero creamos un carro para actualizar
    const newCarData: CreateCarDto = { brand: 'Tesla', model: 'Model 3', year: 2023 };
    const createdCar = service.create(newCarData);
    
    const updateData: UpdateCarDto = { model: 'Model S', year: 2024 };
    const result = service.update(createdCar.id, updateData);
    expect(result).toBeDefined();
    expect(result.model).toBe(updateData.model);
    expect(result.year).toBe(updateData.year);
    expect(result.brand).toBe(newCarData.brand); // Mantiene el brand original
  });

  it('should delete a car by ID', () => {
    // Primero creamos un carro para eliminar
    const newCarData: CreateCarDto = { brand: 'BMW', model: 'X5', year: 2023 };
    const createdCar = service.create(newCarData);
    
    const result = service.delete(createdCar.id);
    expect(result).toBeDefined();
    expect(result.message).toBe(`Car with ID ${createdCar.id} deleted`);
  });
});
