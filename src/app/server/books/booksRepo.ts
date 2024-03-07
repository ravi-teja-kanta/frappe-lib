import supabase from "@/lib/supabase";
import { Book, BookDTO } from "@/models/book";

async function findOffset() {
    //send queries in batches to 10 at once.
    // call from page 1-10, if page 10 already exists then increment batch, call page 11-20
    // else find the least page number which has the last value not already imported.
    // return it
}

async function importAllBooks() {
    // findOffsetPage
    // find remaining books in page
    // continue adding books until num of books is done
}

async function getAllUnAddedBooksinThePage() {
    
}

export function toBook(bookDTO: BookDTO): Book {
    return {
        id: bookDTO.id,
        bookId: bookDTO.book_book_id,
        title: bookDTO.book_title,
        authors: JSON.parse(bookDTO.book_authors),
        publisher: bookDTO.book_publisher,
        rating: bookDTO.book_rating,
        language: bookDTO.book_lang,
        numOfPages: bookDTO.book_page_count
    }
}

export function toBookDTO(book: any): BookDTO {
    // {
    //     "bookID": "41909",
    //     "title": "Harry Potter ve Sırlar Odası (Harry Potter  #2)",
    //     "authors": "J.K. Rowling/Sevin Okyay",
    //     "average_rating": "4.42",
    //     "isbn": "3570211029",
    //     "isbn13": "9783570211021",
    //     "language_code": "tur",
    //     "  num_pages": "403",
    //     "ratings_count": "1000",
    //     "text_reviews_count": "41",
    //     "publication_date": "10/1/2001",
    //     "publisher": "Yapı Kredi Yayınları"
    //     }
    return {
        book_book_id: book["bookID"]!!,
        book_title: book["title"]!!,
        book_authors: book["authors"]?.split("/"),
        book_rating: book["average_rating"]!!,
        book_lang: book["language_code"]!!,
        book_page_count: book["  num_pages"]!!,
        book_publisher: book["publisher"]!!,
        book_publication_date: book["publication_date"]!!
        // id: book["id"]!!
    }
}

export async function getAllBooksWhichAlreadyExist(bookIds: any[]): Promise <BookDTO[]> {
    
    let { data, error, count } = 
        await supabase
            .from('books')
            .select("*")
            .in('book_book_id', bookIds);

    if (error) throw Error(error.message)
    console.log(count, data)
    return data || [];
        
}
export async function insertBooks(books: BookDTO[]) {
    
    const { data, error, count } = 
        await supabase
                .from('books')
                .insert(books)
                .select();

    if (error) throw Error(error.message); 
    
    return data
}

export async function getBooks() {

    let { data: books, error } = 
        await supabase
            .from('books')
            .select('*')

    return books;
                
}

export async function searchBooks(searchQuery: string) {
    if (searchQuery === "") return [];
    const searchRes: any[] = [];
    const { data: titleSearchResults, error: titleError } = await supabase.from('books').select().textSearch('book_title', `'${searchQuery}'`);
    const { data: authorSearchResults, error: authorsError } = await supabase.from('books').select().textSearch('book_authors', `'${searchQuery}'`);
    // const { data: idSearchResults, error: idError } = await supabase.from('books').select().is('book_book_id', `'${searchQuery}'`);

    if (titleError || authorsError) throw Error(titleError?.message + " " + authorsError?.message);

    return searchRes.concat(titleSearchResults).concat(authorSearchResults);

}

export async function readBook(bookId: string): Promise<BookDTO> {    
    const { data: books, error } = 
        await supabase
            .from('books')
            .select('*')
            .eq("book_book_id", bookId)
    if (error) throw Error(error.message);

    return books.pop();
}