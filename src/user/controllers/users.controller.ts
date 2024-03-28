import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { users } from '../entities/users.entity';

@Controller('api/user')
export class UsersController {
    constructor(private userService: UserService) { }
    
    @Get(':id')
    getOne(@Param('id') id: string): Promise<users> {
        //example postman @Param    -> http://localhost:3000/api/productos/123
        //example postman @Query    -> http://localhost:3001/api/user?id=1 
        return this.userService.findUser(id);
    }

    @Get()
    getAll() {
        return this.userService.findAll();
    }

    @Post()
    create(@Body() body: users) {
        body.register = new Date();
        return this.userService.create(body);
    }

    @Put(':id')
    Update(@Param('id') id: number, @Body() body: any) {
        return this.userService.update(id, body);
    }

}
