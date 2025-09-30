import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/bookSchema';
import { CreateBookDto } from './dto/create.book.dto';
import { Throttle, SkipThrottle } from '@nestjs/throttler';
import { UpdateBookDto } from './dto/update.book.dto';

@SkipThrottle()
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}


  @SkipThrottle({
    default:false,
  })
  
  @Get()
async getAllBooks(
  @Query('author') author?: string,
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 10,
): Promise<{
  data: Book[];
  total: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> {
  return this.bookService.findAllBooks(author, +page, +limit);
}

  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }

  @Throttle({short:{ttl:1000, limit:1}})  //throttler at controller level
  @Get(':id')
  async getSingleBook(@Param('id',ParseIntPipe) id: string): Promise<Book> {
    return this.bookService.findBookById(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id:string){
    return this.bookService.deleteBook(id);
  }

  @Put(':id')
  async updateBook(@Param('id')id:string, @Body() book:UpdateBookDto):Promise<Book>{
    return this.bookService.updateBook(id, book)
  }
}
