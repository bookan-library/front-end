import { Book } from "./Book"

export interface CartItem {
    id: number
    quantity: number
    book: Book
}