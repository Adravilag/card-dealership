import { Test, TestingModule } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CarsService', () => {
  let service: CarsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarsService],
    }).compile();

    service = module.get<CarsService>(CarsService);
    
    // Agregar datos de prueba
    service.create({ brand: 'Toyota', model: 'Corolla', year: 2020 });
    service.create({ brand: 'Honda', model: 'Civic', year: 2019 });
    service.create({ brand: 'Ford', model: 'Mustang', year: 2021 });
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
    expect(result.message).toBe(`Car with ID '${createdCar.id}' deleted successfully`);
  });

  // Tests para verificar códigos de estado HTTP correctos (400 y 404)
  
  describe('Error Handling - HTTP Status Codes', () => {
    
    it('should throw BadRequestException (400) when trying to create a car that already exists', () => {
      const existingCar = service.findAll()[0];
      const duplicateCarData: CreateCarDto = { 
        brand: existingCar.brand, 
        model: existingCar.model, 
        year: existingCar.year 
      };
      
      expect(() => service.create(duplicateCarData)).toThrow(BadRequestException);
      expect(() => service.create(duplicateCarData)).toThrow(
        `Car ${duplicateCarData.brand} ${duplicateCarData.model} ${duplicateCarData.year} already exists`
      );
    });

    it('should throw BadRequestException (400) when trying to create a car with same details but different case', () => {
      const existingCar = service.findAll()[0];
      const duplicateCarData: CreateCarDto = { 
        brand: existingCar.brand.toUpperCase(), 
        model: existingCar.model.toUpperCase(), 
        year: existingCar.year 
      };
      
      expect(() => service.create(duplicateCarData)).toThrow(BadRequestException);
    });

    it('should throw NotFoundException (404) when trying to find a car with non-existing ID', () => {
      const nonExistingId = 'non-existing-uuid-123';
      
      expect(() => service.findById(nonExistingId)).toThrow(NotFoundException);
      expect(() => service.findById(nonExistingId)).toThrow(`Car with ID '${nonExistingId}' not found`);
    });

    it('should throw NotFoundException (404) when trying to update a car with non-existing ID', () => {
      const nonExistingId = 'non-existing-uuid-456';
      const updateData: UpdateCarDto = { model: 'Updated Model', year: 2024 };
      
      expect(() => service.update(nonExistingId, updateData)).toThrow(NotFoundException);
      expect(() => service.update(nonExistingId, updateData)).toThrow(`Car with ID '${nonExistingId}' not found`);
    });

    it('should throw NotFoundException (404) when trying to delete a car with non-existing ID', () => {
      const nonExistingId = 'non-existing-uuid-789';
      
      expect(() => service.delete(nonExistingId)).toThrow(NotFoundException);
      expect(() => service.delete(nonExistingId)).toThrow(`Car with ID '${nonExistingId}' not found`);
    });

  });

  describe('Success Cases - Verify correct responses', () => {

    it('should successfully create a car with unique details and return proper structure', () => {
      const newCarData: CreateCarDto = { brand: 'Audi', model: 'A4', year: 2023 };
      const result = service.create(newCarData);
      
      expect(result).toBeDefined();
      expect(result.brand).toBe(newCarData.brand);
      expect(result.model).toBe(newCarData.model);
      expect(result.year).toBe(newCarData.year);
      expect(result.id).toBeDefined();
      expect(typeof result.id).toBe('string');
    });

    it('should successfully update an existing car and return updated structure', () => {
      // Crear un carro primero
      const newCarData: CreateCarDto = { brand: 'Mercedes', model: 'C-Class', year: 2022 };
      const createdCar = service.create(newCarData);
      
      // Actualizarlo
      const updateData: UpdateCarDto = { model: 'E-Class', year: 2024 };
      const result = service.update(createdCar.id, updateData);
      
      expect(result).toBeDefined();
      expect(result.model).toBe(updateData.model);
      expect(result.year).toBe(updateData.year);
      expect(result.brand).toBe(newCarData.brand);
      expect(result.id).toBe(createdCar.id);
    });

    it('should successfully delete an existing car and return success message', () => {
      // Crear un carro primero
      const newCarData: CreateCarDto = { brand: 'Porsche', model: '911', year: 2023 };
      const createdCar = service.create(newCarData);
      
      // Eliminarlo
      const result = service.delete(createdCar.id);
      
      expect(result).toBeDefined();
      expect(result).toEqual({ message: `Car with ID '${createdCar.id}' deleted successfully` });
      
      // Verificar que ya no existe
      expect(() => service.findById(createdCar.id)).toThrow(NotFoundException);
    });

    it('should allow creating cars with same brand/model but different years', () => {
      const carData1: CreateCarDto = { brand: 'Volkswagen', model: 'Golf', year: 2022 };
      const carData2: CreateCarDto = { brand: 'Volkswagen', model: 'Golf', year: 2023 };
      
      const result1 = service.create(carData1);
      const result2 = service.create(carData2);
      
      expect(result1).toBeDefined();
      expect(result2).toBeDefined();
      expect(result1.id).not.toBe(result2.id);
      expect(result1.year).not.toBe(result2.year);
    });

  });

});
