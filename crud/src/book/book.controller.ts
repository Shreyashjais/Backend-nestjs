import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schema/bookSchema';
import { CreateBookDto } from './dto/create.book.dto';


@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    return this.bookService.findAll();
  }

  @Post()
  async createBook(@Body() book: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(book);
  }

  
  @Get(':id')
  async getSingleBook(@Param('id') id: string): Promise<Book> {
    return this.bookService.singleBook(id);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id:string){
    return this.bookService.deleteBook(id);
  }

  @Put(':id')
  async updateBook(@Param('id')id:string, @Body() book:CreateBookDto):Promise<Book>{
    return this.bookService.updateBook(id, book)
  }
}
