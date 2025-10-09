import { Test, TestingModule } from '@nestjs/testing';
import { SeedService } from './seed.service';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';

describe('SeedService', () => {
  let service: SeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeedService, CarsService, BrandsService],
    }).compile();

    service = module.get<SeedService>(SeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Additional tests can be added here

  it('should populate the database', () => {
    const result = service.populateDB();
    expect(result).toBe('SEED executed');
  });

  it('should call fillCarsWithSeedData and fillBrandsWithSeedData', () => { 
    const carsServiceSpy = jest.spyOn(service['carsService'], 'fillCarsWithSeedData');
    const brandsServiceSpy = jest.spyOn(service['brandsService'], 'fillBrandsWithSeedData');
    service.populateDB();
    expect(carsServiceSpy).toHaveBeenCalled();
    expect(brandsServiceSpy).toHaveBeenCalled();
  });

  // More tests can be added to verify the behavior of populateDB

  it('should return the correct message when populateDB is called', () => {
    const message = service.populateDB();
    expect(message).toBe('SEED executed');
  });

  it('should call carsService.fillCarsWithSeedData with CARS_SEED', () => {
    const carsServiceSpy = jest.spyOn(service['carsService'], 'fillCarsWithSeedData');
    service.populateDB();
    expect(carsServiceSpy).toHaveBeenCalledWith(expect.any(Array));
  });

  it('should call brandsService.fillBrandsWithSeedData with BRANDS_SEED', () => {
    const brandsServiceSpy = jest.spyOn(service['brandsService'], 'fillBrandsWithSeedData');
    service.populateDB();
    expect(brandsServiceSpy).toHaveBeenCalledWith(expect.any(Array));
  });

});
