import { Book } from "./Book"
import { Buyer } from "./Buyer"

export interface Comment {
    id: number
    content: string
    nickname: string
    email: string
    buyer: Buyer
    book: Book
}