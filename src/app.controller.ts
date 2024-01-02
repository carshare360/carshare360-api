import { Controller, Get, HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('/generate')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/fake-data')
  @Public()
  @ApiOperation({ summary: 'Generate fake data' })
  @ApiResponse({ status: 200, description: 'Fake data generated.' })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @HttpCode(200)
  generateFakeData() {
    console.log('generateFakeData');
    return this.appService.generateFakeData();
  }
}
