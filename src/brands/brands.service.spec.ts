import { Test, TestingModule } from '@nestjs/testing';
import { BrandsService } from './brands.service';
import { CreateBrandDto, UpdateBrandDto } from './dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('BrandsService', () => {
  let service: BrandsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrandsService],
    }).compile();

    service = module.get<BrandsService>(BrandsService);
    
    // Agregar datos de prueba
    service.create({ name: 'Toyota' });
    service.create({ name: 'Honda' });
    service.create({ name: 'Ford' });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Additional tests can be added here

  it('should return all brands', () => {
    const result = service.findAll();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
  });

  it('should return a brand by ID', () => {
    // Obtenemos un ID válido de los datos mock
    const allBrands = service.findAll();
    const validBrandId = allBrands[0].id;
    const result = service.findOne(validBrandId);
    expect(result).toBeDefined();
    expect(result.id).toBe(validBrandId);
  });

  it('should create a new brand', () => {
    const newBrandData: CreateBrandDto = { name: 'Mazda' };
    const result = service.create(newBrandData);
    expect(result).toBeDefined();
    expect(result.name).toBe(newBrandData.name);
    expect(result.id).toBeDefined(); // Debe tener un ID generado automáticamente
  });

  it('should update a brand by ID', () => {
    // Primero creamos una marca para actualizar
    const newBrandData: CreateBrandDto = { name: 'Subaru' };
    const createdBrand = service.create(newBrandData);  
    const updateData: UpdateBrandDto = { name: 'Subaru Updated' };
    const result = service.update(createdBrand.id, updateData);
    expect(result).toBeDefined();
    expect(result.name).toBe(updateData.name);
    expect(result.id).toBe(createdBrand.id); // Mantiene el ID original

  });

  it('should delete a brand by ID', () => {
    // Primero creamos una marca para eliminar
    const newBrandData = { name: 'Nissan' };
    const createdBrand = service.create(newBrandData);
    const result = service.remove(createdBrand.id);
    expect(result).toBeDefined();
    expect(result).toEqual({ message: 'Brand removed successfully' });
  });

  // Tests for error handling and success cases
  describe('Error Handling - HTTP Status Codes', () => {
    
    // Debería lanzar BadRequestException (400) al intentar crear una marca que ya existe
    it('should throw BadRequestException (400) when trying to create a brand that already exists', () => {
      const existingBrand = service.findAll()[0];
      const duplicateBrandData: CreateBrandDto = { name: existingBrand.name };
      
      expect(() => service.create(duplicateBrandData)).toThrow(BadRequestException);
      expect(() => service.create(duplicateBrandData)).toThrow('Brand already exists');
    });

    // Debería lanzar BadRequestException (400) al intentar crear una marca con el mismo nombre pero diferente case
    it('should throw BadRequestException (400) when trying to create a brand with same name but different case', () => {
      const existingBrand = service.findAll()[0];
      const duplicateBrandData: CreateBrandDto = { name: existingBrand.name.toUpperCase() };
      
      expect(() => service.create(duplicateBrandData)).toThrow(BadRequestException);
      expect(() => service.create(duplicateBrandData)).toThrow('Brand already exists');
    });

    // Debería lanzar NotFoundException (404) al intentar buscar, actualizar o eliminar una marca con un ID que no existe
    it('should throw NotFoundException (404) when trying to find a brand with non-existing ID', () => {
      const nonExistingId = 'non-existing-uuid-123';
      
      expect(() => service.findOne(nonExistingId)).toThrow(NotFoundException);
      expect(() => service.findOne(nonExistingId)).toThrow(`Brand with ID '${nonExistingId}' not found`);
    });

    // Debería lanzar NotFoundException (404) al intentar actualizar una marca con un ID que no existe
    it('should throw NotFoundException (404) when trying to update a brand with non-existing ID', () => {
      const nonExistingId = 'non-existing-uuid-456';
      const updateData: UpdateBrandDto = { name: 'Updated Brand' };
      
      expect(() => service.update(nonExistingId, updateData)).toThrow(NotFoundException);
      expect(() => service.update(nonExistingId, updateData)).toThrow(`Brand with ID '${nonExistingId}' not found`);
    });

    // Debería lanzar NotFoundException (404) al intentar eliminar una marca con un ID que no existe
    it('should throw NotFoundException (404) when trying to remove a brand with non-existing ID', () => {
      const nonExistingId = 'non-existing-uuid-789';
      
      expect(() => service.remove(nonExistingId)).toThrow(NotFoundException);
      expect(() => service.remove(nonExistingId)).toThrow(`Brand with ID '${nonExistingId}' not found`);
    });

  });

  // Casos de éxito
  describe('Success Cases - Verify correct responses', () => {

    // Debería crear una marca con un nombre único y devolver la estructura correcta
    it('should successfully create a brand with unique name and return proper structure', () => {
      const newBrandData: CreateBrandDto = { name: 'Tesla' };
      const result = service.create(newBrandData);
      
      expect(result).toBeDefined();
      expect(result.name).toBe(newBrandData.name);
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(typeof result.id).toBe('string');
      expect(typeof result.createdAt).toBe('number');
    });

    // Debería actualizar una marca existente y devolver la estructura actualizada
    it('should successfully update an existing brand and return updated structure', () => {
      // Crear una marca primero
      const newBrandData: CreateBrandDto = { name: 'Volkswagen' };
      const createdBrand = service.create(newBrandData);
      
      // Actualizarla
      const updateData: UpdateBrandDto = { name: 'Volkswagen Updated' };
      const result = service.update(createdBrand.id, updateData);
      
      expect(result).toBeDefined();
      expect(result.name).toBe(updateData.name);
      expect(result.id).toBe(createdBrand.id);
      expect(result.updatedAt).toBeDefined();
      expect(typeof result.updatedAt).toBe('number');
    });

    // Debería eliminar una marca existente y devolver el mensaje de éxito
    it('should successfully remove an existing brand and return success message', () => {
      // Crear una marca primero
      const newBrandData: CreateBrandDto = { name: 'Peugeot' };
      const createdBrand = service.create(newBrandData);
      
      // Eliminarla
      const result = service.remove(createdBrand.id);
      
      expect(result).toBeDefined();
      expect(result).toEqual({ message: 'Brand removed successfully' });
      
      // Verificar que ya no existe
      expect(() => service.findOne(createdBrand.id)).toThrow(NotFoundException);
    });

  });

});
