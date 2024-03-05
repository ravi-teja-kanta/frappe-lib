"use server"

import { getAllBooksWhichAlreadyExist, insertBooks, toBookDTO } from "./booksRepo";
import { getFrappeLibBooks } from "./frappeManager"
import { uniq, without, uniqBy } from "lodash"
export async function importAllBooks(title: string, numberOfBooksToImport: number) {
    let pageNumber = 1;
    let numberOfBooksAdded = 0;
    let finalStatus;
    while(numberOfBooksAdded < numberOfBooksToImport) {
        const { status, booksAdded } = await addBooksInThePage(title, pageNumber, numberOfBooksToImport - numberOfBooksAdded);
        finalStatus = status;
        if (status === "ADDED_ALL_BOOKS" || status === "NO_BOOKS_LEFT_TO_SEARCH") break;
        else {
            numberOfBooksAdded += booksAdded;
            pageNumber += 1;
        }
    }
    return { status: finalStatus, numberOfBooksAdded };
}

async function addBooksInThePage(title: string, pageNumber: number, numberOfBooksLeft: number) {
    if (numberOfBooksLeft < 1) return { status: "ADDED_ALL_BOOKS", booksAdded: 0};

    const books = uniqBy(await getFrappeLibBooks({title, pageNumber}), "bookID"); // handling duplicates returned by frappe
    
    if (books.length < 1) return { status: "NO_BOOKS_LEFT_TO_SEARCH", booksAdded: 0}

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
        booksAdded: booksToBeAdded.length
    }
    
}