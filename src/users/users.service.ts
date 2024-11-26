import { Injectable, HttpException, HttpStatus, Res  } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { UserDocument } from './models/user.model'; 
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<UserDocument>, 
        private readonly configService: ConfigService,
    ) { }

    async createUser(createUserDto: CreateUserDto) {
        const { password, ...userData } = createUserDto;

      
        const existingUser = await this.userModel.findOne({ email: userData.email });
        if (existingUser) {
            throw new HttpException('Email is already in use', HttpStatus.BAD_REQUEST);
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await this.userModel.create({ ...userData, password: hashedPassword });

        const secretKey = this.configService.get('SECRET_KEY');
        if (!secretKey) {
            throw new HttpException('Secret key not configured', HttpStatus.INTERNAL_SERVER_ERROR);
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            secretKey,
            { expiresIn: '24h' }
        );

        return { token, user };
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const user = await this.userModel.findOne({ email: loginUserDto.email });
        if (!user) {
            throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
        }

        const isMatch = await bcrypt.compare(loginUserDto.password, user.password);
        if (!isMatch) {
            throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            
        }

        const secretKey = this.configService.get('SECRET_KEY');
        if (!secretKey) {
            throw new HttpException('Secret key not configured', HttpStatus.BAD_REQUEST);
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            secretKey,
            { expiresIn: '24h' }
        );

        return { token, user }
    }
}
