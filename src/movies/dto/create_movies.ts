import { IsEmail, IsString, MinLength, IsNumber } from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
export class CreateMoviesDto {
    @IsNumber()
    idMovie!: Number;

    @IsString()
    title!: string;

    @IsString()
    photo!: string;

    @IsObjectId()
    userId!: string;

}
