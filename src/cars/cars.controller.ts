import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseIntPipe) id: number): any {
    return this.carsService.findById(Number(id));
  }

  @Post()
  createCar(@Body() car: any) {
    return this.carsService.create(car);
    // url: localhost:3000/cars
    // body: { "brand": "Chevrolet", "model": "Camaro", "year": 2022
  }

  @Patch(':id')
  updateCar(@Param('id', ParseIntPipe) id: number, @Body() car: any) {
    return this.carsService.update(id, car);
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseIntPipe) id: number) {
    return this.carsService.delete(id);
  }

}
