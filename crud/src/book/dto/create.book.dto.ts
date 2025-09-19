import { Category } from "../schema/bookSchema";

export class CreateBookDto {
    readonly title: string;
    readonly author: string;
    readonly description: string;
    readonly price: number;
    readonly category: Category;
  }
  