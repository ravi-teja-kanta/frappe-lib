"use server"

import { getAllBooksWhichAlreadyExist, insertBooks, readBook, toBookDTO } from "./booksRepo";
import { getFrappeLibBooks } from "./frappeManager"
import { uniq, without, uniqBy } from "lodash"
import { BookDTO } from "@/models/book";

export async function importBooksPageWise(title: string, numberOfBooksToImport: number) {
    let pageNumber = 1;
    let numberOfBooksAdded = 0;
    let finalStatus;
    let finalBooksAdded: BookDTO[] = [];
    while(numberOfBooksAdded < numberOfBooksToImport) {
        const { status, booksAdded } = await addBooksInThePage(title, pageNumber, numberOfBooksToImport - numberOfBooksAdded);
        finalStatus = status;
        if (status === "ADDED_ALL_BOOKS" || status === "NO_BOOKS_LEFT_TO_SEARCH") break;
        else {
            numberOfBooksAdded += booksAdded.length;
            finalBooksAdded = finalBooksAdded.concat(finalBooksAdded, booksAdded)
            pageNumber += 1;
        }
    }
    return { status: finalStatus, booksAdded: finalBooksAdded };
}

async function addBooksInThePage(title: string, pageNumber: number, numberOfBooksLeft: number) {
    if (numberOfBooksLeft < 1) return { status: "ADDED_ALL_BOOKS", booksAdded: []};

    const books = uniqBy(await getFrappeLibBooks({title, pageNumber}), "bookID"); // handling duplicates returned by frappe
    
    if (books.length < 1) return { status: "NO_BOOKS_LEFT_TO_SEARCH", booksAdded: []}

    const bookIds = books.map(b => b["bookID"]);
    
    const booksWhichAlreadyExist = await getAllBooksWhichAlreadyExist(bookIds);
    const bookIdsWhichAlreadyExist = booksWhichAlreadyExist.map(bk => bk.book_book_id);
    const booksToBeAdded = 
        books.filter(b => !(bookIdsWhichAlreadyExist.includes(b["bookID"])))
        .map(toBookDTO)
        .slice(0, numberOfBooksLeft)

    if (booksToBeAdded.length > 0) {
        await insertBooks(booksToBeAdded);
    }
    
    return {
        status: "ADDED_BOOKS_IN_THE_PAGE",
        booksAdded: booksToBeAdded
    }
    
}

export async function getBookProfileFromBookId(bookId: string) {
    const book = await readBook(bookId);
    if (!book) throw Error("Does not exist");
    return book;
}