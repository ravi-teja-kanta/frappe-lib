"use server"

import supabase from "@/lib/supabase";
import { Book, BookDTO } from "@/models/book/book";
import { importAllBooks } from "./booksManager";
import { getAllBooksWhichAlreadyExist } from "./booksRepo";

export async function getBooksFromFrappe(title: string, numberOfBooks: number) {

    if (numberOfBooks > 200) return { status: "fail", books: [], message: "Max number of books allowed is 200"};

    const {status, numberOfBooksAdded} = await importAllBooks(title, numberOfBooks);
    
    console.log(status, numberOfBooks)
    
    return { status, message: `Added ${numberOfBooksAdded} books`};
}
