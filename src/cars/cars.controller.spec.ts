import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';

describe('CarsController', () => {
  let controller: CarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
    }).compile();

    controller = module.get<CarsController>(CarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Additional tests can be added here
  it('should return all cars', () => {  
    const result = controller.getAllCars();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return a car by ID', () => {  
    const carId = 1;
    const result = controller.getCarById(carId);
    expect(result).toBeDefined();
    expect(result.id).toBe(carId);
  });

  it('should update a car by ID', () => { 
    const carId = 1;
    const updateData = { model: 'UpdatedModel' };
    const result = controller.updateCar(carId, updateData);
    expect(result).toBeDefined();
    expect(result.model).toBe(updateData.model);
  });

  it('should delete a car by ID', () => { 
    const carId = 1;
    const result = controller.deleteCar(carId);
    expect(result).toBeDefined();
    expect(result.message).toBe(`Car with ID ${carId} deleted`);
  });

});
