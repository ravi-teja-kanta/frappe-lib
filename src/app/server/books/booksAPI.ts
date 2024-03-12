"use server"

import { getBookProfileFromBookId, importBooksPageWise } from "./booksManager";

export async function importBooks(title: string, numberOfBooks: number) {

    if (numberOfBooks > 200) return { status: "fail", books: [], message: "Max number of books allowed is 200"};

    const {status, booksAdded} = await importBooksPageWise(title, numberOfBooks);
    
    
    return { status, message: `Added ${booksAdded.length} books`, books: booksAdded};
}

export async function getBookProfile(id: string) {
    return await getBookProfileFromBookId(id);
}