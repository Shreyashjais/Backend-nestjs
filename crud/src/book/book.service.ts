import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Injectable } from '@nestjs/common';
import { Book, BookDocument } from './schema/bookSchema';
import { CreateBookDto } from './dto/create.book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const createdBook =  this.bookModel.create(createBookDto);
    return createdBook
  }

  async singleBook(id:string): Promise<Book> {
    const singleBook = this.bookModel.findById(id)
    return singleBook
  }

  async deleteBook(id:string){
    this.bookModel.findByIdAndDelete(id)
  }

  async updateBook(id: string, book: CreateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(
      id,
      { $set: book },  
      { new: true }  
    ).exec();
  
    return updatedBook;
  }
}
