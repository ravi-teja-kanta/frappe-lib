export type Book = {
    id?: string,
    bookId: string,
    title: string,
    authors: string[],
    publisher: string
    rating: number,
    language: string,
    numOfPages: number
}

export type BookDTO = {
    id?: string,
    book_title: string,
    book_book_id: string,
    book_authors: string,
    book_rating: number,
    book_lang: string,
    book_page_count: number,
    book_publisher: string,
    book_publication_date: Date
}