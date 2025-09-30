import { IsString, IsNotEmpty, MaxLength, IsNumber, Min, IsEnum } from 'class-validator';
import { Category } from '../schema/bookSchema';
import { Expose } from 'class-transformer';

export class CreateBookDto {
  @IsString()
  @Expose()    //we can use expose and exclude to include or not include fields in the response  
  @IsNotEmpty({ message: 'Title is required' })
  @MaxLength(100, { message: 'Title must not exceed 100 characters' })
  readonly title: string;

  @IsString()
  @IsNotEmpty({ message: 'Author is required' })
  readonly author: string;

  @IsString()
  @MaxLength(500, { message: 'Description must not exceed 500 characters' })
  readonly description: string;

  @IsNumber()
  @Min(0, { message: 'Price must be at least 0' })
  readonly price: number;

  @IsEnum(Category, { message: 'Category must be one of the predefined values' })
  readonly category: Category;
}
