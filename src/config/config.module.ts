import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigController } from './controllers/config.controller';
import { ConfigService } from './services/config.service';
import { Config } from './entities/config.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([Config])  
      ],
      providers: [ConfigService],
      controllers: [ConfigController]
})
export class CustomersModule {}
