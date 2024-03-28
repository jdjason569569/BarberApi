import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { users } from './entities/users.entity';
import { UserService } from './services/user.service';
import { UsersController } from './controllers/users.controller';
import { Config } from 'src/config/entities/config.entity';
@Module({
    imports: [
        TypeOrmModule.forFeature([users, Config])  
      ],
      providers: [UserService],
      controllers: [UsersController]
})
export class UserModule {}
