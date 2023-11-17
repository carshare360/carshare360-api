import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { VehicleService } from './vehicles.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Public } from 'src/auth/public.decorator';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehicleController {
  constructor(private readonly vehicleService: VehicleService) {}

  @Post()
  @Public()
  @ApiOperation({ summary: 'Create a new vehicle' })
  @ApiResponse({ status: 201, description: 'The vehicle has been successfully created.'})
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(201)
  create(@Body() createVehicleDto: CreateVehicleDto) {
    return this.vehicleService.create(createVehicleDto);
  }

  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all vehicles' })
  @ApiResponse({ status: 200, description: 'All vehicles retrieved.' })
  @HttpCode(200)
  findAll() {
    return this.vehicleService.findAll();
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Get a vehicle by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Vehicle ID' })
  @ApiResponse({ status: 200, description: 'Vehicle found.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @HttpCode(200)
  findOne(@Param('id') id: string) {
    return this.vehicleService.findOne(+id);
  }

  @Patch(':id')
  @Public()
  @ApiOperation({ summary: 'Update a vehicle' })
  @ApiParam({ name: 'id', type: 'number', description: 'Vehicle ID' })
  @ApiResponse({ status: 200, description: 'Vehicle updated successfully.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @HttpCode(200)
  update(@Param('id') id: string, @Body() updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleService.update(+id, updateVehicleDto);
  }

  @Delete(':id')
  @Public()
  @ApiOperation({ summary: 'Delete a vehicle' })
  @ApiParam({ name: 'id', type: 'number', description: 'Vehicle ID' })
  @ApiResponse({ status: 200, description: 'Vehicle deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Vehicle not found.' })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.vehicleService.remove(+id);
  }
}
