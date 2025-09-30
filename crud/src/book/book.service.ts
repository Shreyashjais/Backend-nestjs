import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Book, BookDocument } from './schema/bookSchema';
import { CreateBookDto } from './dto/create.book.dto';
import { UpdateBookDto } from './dto/update.book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async findAllBooks(
    author?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    data: Book[];
    total: number;
    page: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalPages: number;
  }> {
    const filter = author ? { author } : {};
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.bookModel.find(filter).skip(skip).limit(limit).exec(),
      this.bookModel.countDocuments(filter).exec(),
    ]);

    return {
      data,
      total,
      page,
      limit,
      hasNextPage: page * limit < total,
      hasPrevPage: page > 1,
      totalPages: Math.ceil(total / limit),
    };
  }

  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    return await this.bookModel.create(createBookDto);
  }

  async findBookById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async updateBook(id: string, book: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, { $set: book }, { new: true })
      .exec();

    if (!updatedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return updatedBook;
  }

  async deleteBook(id: string): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return deletedBook;
  }
}




// Exception             	      Status Code	      When to use
// BadRequestException	        400	              Invalid input, validation errors
// UnauthorizedException	      401	              Authentication failed or missing token
// ForbiddenException	          403	              User not allowed to access resource
// NotFoundException	          404	              Resource not found
// ConflictException	          409	              Conflict (e.g., duplicate email)
// InternalServerErrorException	500	              Unexpected server error
// ServiceUnavailableException	503	              External service down or unavailable   