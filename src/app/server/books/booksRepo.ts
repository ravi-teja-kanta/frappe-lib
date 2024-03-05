import supabase from "@/lib/supabase";
import { BookDTO } from "@/models/book/book";

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

export function toBookDTO(book: any): BookDTO {
    return {
        book_book_id: book["bookID"]!!,
        book_title: book["title"]!!
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