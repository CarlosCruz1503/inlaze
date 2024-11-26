import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DatabaseModule } from '../database/database.module';  
import { UserModule } from '../users/users.module';  
import { AuthModule } from '../auth/auth.module';  
import { ImdbModule } from "src/imdb/imdb.module";
import { JwtAuthModule } from "../auth/jwt.module";
import { ConfigModule } from '@nestjs/config';
import { MoviesModule } from "src/movies/movies.module";
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env', 
  }),DatabaseModule, UserModule, AuthModule, ImdbModule, JwtAuthModule,MoviesModule ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
