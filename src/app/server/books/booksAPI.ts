"use server"

import { getBookProfileFromBookId, importBooksPageWise } from "./booksManager";

export async function importBooks(title: string, numberOfBooks: number) {

    if (numberOfBooks > 200) return { status: "fail", books: [], message: "Max number of books allowed is 200"};

    const {status, numberOfBooksAdded} = await importBooksPageWise(title, numberOfBooks);
    
    console.log(status, numberOfBooks)
    
    return { status, message: `Added ${numberOfBooksAdded} books`};
}

export async function getBookProfile(id: string) {
    return await getBookProfileFromBookId(id);
}
