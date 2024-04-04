import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { TurnService } from '../services/turn.service';

@Controller('api/turns')
export class TurnController {
  constructor(private turnService: TurnService) {}

  @Get()
  getAll() {
    return this.turnService.findAll();
  }

  @Get('turncustomer/:id')
  getAllTurnCustomer(@Param('id') id: string) {
    return this.turnService.getAllTurnCustomerByDay(id);
  }

  @Get('turncustomer/schedule/:id/:startDate')
  getAllTurnCustomerBySchedule(@Param('id') id: string, @Param('startDate') startDate: string) {
    return this.turnService.getAllTurnCustomerBySchedule(id, startDate);
  }

  @Post(':method')
  create(@Param('method') method: string, @Body() body: any) {
    return this.turnService.create(body, method);
  }

  @Put('order/update/:newIndex')
  async createOrder(
    @Param('newIndex', ParseIntPipe) newIndex: number,
    @Body() body: any,
  ) {
    return await this.turnService.orderCreate(body, newIndex);
  }

  @Put('postpone')
  async postpone(@Body() body: any) {
    return await this.turnService.postpone(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: any) {
    return this.turnService.update(id, body);
  }

  @Put('disable/:id')
  disable(@Param('id', ParseIntPipe) id: number) {
    return this.turnService.disable(id);
  }

  @Put('turn/:id')
  updateTurn(@Param('id') id: number, @Body() body: any) {
    return this.turnService.updateTurn(id, body);
  }

  @Put('completed/:idStatus')
  updateTurnStatus(@Param('idStatus') idStatus: string, @Body() body: any) {
    return this.turnService.updateTurnStatus(idStatus, body);
  }

  
}
