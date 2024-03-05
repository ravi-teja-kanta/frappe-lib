export type Book = {
    id: string,
    title: string,
    authors: string[],
    publisher: string
    rating: number
}

export type BookDTO = {
    book_title: string,
    book_book_id: string
}