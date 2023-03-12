export type AddBook = {
    name: string
    description: string
    pageNumber: number
    publishingYear: number
    authorId: number
    publisherId: number
    categoryId: number
    file: File
}