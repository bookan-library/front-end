import { Author } from "./Author"
import { Category } from "./Category"
import { Publisher } from "./Publisher"

export interface Book {
    id: number
    name: string
    description: string
    pageNumber: number
    publishingYear: number
    author: Author
    publisher: Publisher
    category: Category
    picUrl: string
}