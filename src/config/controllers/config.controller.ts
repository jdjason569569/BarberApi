import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { Config } from '../entities/config.entity';
import { ConfigService } from '../services/config.service';

@Controller('api/config')
export class ConfigController {
    constructor(private configService: ConfigService) { }
    
    @Get(':id')
    getOne(@Param('id') id: string): Promise<Config> {
        //example postman @Param    -> http://localhost:3000/api/productos/123
        //example postman @Query    -> http://localhost:3001/api/user?id=1 
        return null;
    }


    @Put(':id')
    UpdateSession(@Param('id') id: number, @Body() body: any) {
        return null;
    }


}
