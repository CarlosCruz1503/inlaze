import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config'; 
import { UserModel } from './models/user.model';  
import { UsersController } from './users.controller';  
import { UsersService } from './users.service';  

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserModel.schema }]),  
    ConfigModule,  
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
