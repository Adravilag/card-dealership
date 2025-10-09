import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BrandsService {
  private brands: Brand[] = [];

  create(createBrandDto: CreateBrandDto) : Brand {
    const { name } = createBrandDto;
    
    if (this.brands.find((brand) => brand.name.toLowerCase() === name.toLowerCase())) {
      throw new BadRequestException('Brand already exists');
    }
    const newBrand: Brand = {
      id: uuidv4(),
      name: createBrandDto.name,
      createdAt: new Date().getTime(),
    };
    this.brands.push(newBrand);
    return newBrand;
  }

  findAll() : Brand[] {
    return this.brands;
  }

  findOne(id: string) : Brand {
    const brand = this.brands.find((brand) => brand.id === id);
    if (!brand) {
      throw new NotFoundException(`Brand with ID '${id}' not found`);
    }
    return brand;
  }

  update(id: string, updateBrandDto: UpdateBrandDto) : Brand {
    let brandDB = this.findOne(id);
    this.brands.map((brand, index) => {
      if (brand.id === id) {
        brandDB.updatedAt = new Date().getTime();
        brandDB = { ...brandDB, ...updateBrandDto };
        this.brands[index] = brandDB;
        return brandDB;
      }
    });
    return brandDB;
  }

  remove(id: string) : { message: string } {
    const brandIndex = this.brands.findIndex((brand) => brand.id === id);
    if (brandIndex === -1) {
      throw new NotFoundException(`Brand with ID '${id}' not found`);
    }
    this.brands.splice(brandIndex, 1);
    return { message: 'Brand removed successfully' };
  }

  fillBrandsWithSeedData(brands: Brand[]) {
    this.brands = brands;
  }

}
