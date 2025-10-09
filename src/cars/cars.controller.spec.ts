import { Test, TestingModule } from '@nestjs/testing';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';

describe('CarsController', () => {
  let controller: CarsController;
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarsController],
      providers: [CarsService],
    }).compile();

    controller = module.get<CarsController>(CarsController);
    service = module.get<CarsService>(CarsService);
    
    // Agregar datos de prueba
    service.create({ brand: 'Toyota', model: 'Corolla', year: 2020 });
    service.create({ brand: 'Honda', model: 'Civic', year: 2019 });
    service.create({ brand: 'Ford', model: 'Mustang', year: 2021 });
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
    // Primero obtenemos todos los carros para usar un ID real
    const allCars = controller.getAllCars();
    const validCarId = allCars[0].id;
    const result = controller.getCarById(validCarId);
    expect(result).toBeDefined();
    expect(result.id).toBe(validCarId);
  });

  it('should create a new car', () => {  
    const newCar: CreateCarDto = { brand: 'Chevrolet', model: 'Camaro', year: 2022 };
    const result = controller.createCar(newCar);
    expect(result).toBeDefined();
    expect(result.brand).toBe(newCar.brand);
    expect(result.model).toBe(newCar.model);
    expect(result.year).toBe(newCar.year);
  });

  it('should update a car by ID', () => { 
    // Primero creamos un carro para actualizar
    const newCar: CreateCarDto = { brand: 'Tesla', model: 'Model 3', year: 2023 };
    const createdCar = controller.createCar(newCar);
    
    const updateData: UpdateCarDto = { model: 'Model S', year: 2024 };
    const result = controller.updateCar(createdCar.id, updateData);
    expect(result).toBeDefined();
    expect(result.model).toBe(updateData.model);
    expect(result.year).toBe(updateData.year);
    expect(result.brand).toBe(newCar.brand); // Mantiene el brand original
  });

  it('should delete a car by ID', () => { 
    // Primero creamos un carro para eliminar
    const newCar: CreateCarDto = { brand: 'BMW', model: 'X5', year: 2023 };
    const createdCar = controller.createCar(newCar);
    
    const result = controller.deleteCar(createdCar.id);
    expect(result).toBeDefined();
    expect(result.message).toBe(`Car with ID '${createdCar.id}' deleted successfully`);
  });

});
