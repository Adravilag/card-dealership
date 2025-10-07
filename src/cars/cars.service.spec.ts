import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';

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
    const carId = 1;
    const result = service.findById(carId);
    expect(result).toBeDefined();
    expect(result.id).toBe(carId);
  });

  it('should create a new car', () => { 
    const newCar = { brand: 'Chevrolet', model: 'Camaro', year: 2022 };
    const result = service.create(newCar);
    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.brand).toBe(newCar.brand);
  });

  it('should update a car by ID', () => { 
    const carId = 1;
    const updateData = { model: 'UpdatedModel' };
    const result = service.update(carId, updateData);
    expect(result).toBeDefined();
    expect(result.model).toBe(updateData.model);
  });

  it('should delete a car by ID', () => { 
    const carId = 1;
    const result = service.delete(carId);
    expect(result).toBeDefined();
    expect(result.message).toBe(`Car with ID ${carId} deleted`);
  }); 

});
