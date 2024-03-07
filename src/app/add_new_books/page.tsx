"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Book, BookDTO } from "@/models/book";
import { useState } from "react";
import { importBooks } from "../server/books/booksAPI";
import { getBooks } from "../server/books/booksRepo";

export default function Page() {
    const [title, setTitle] = useState<string>("");
    const [numberOfBooks, setNumberOfBooks] = useState<number>(1);

    const [books, setBooks] = useState<BookDTO[]>([]);

    async function handleSearchFrappe() {
        let {status, message} = await importBooks(title, numberOfBooks);
        alert(status + " " + message);
        let books = await getBooks();
        setBooks(books!!);
        
    }
    return (
        <div className="flex flex-col pt-12 px-24 space-y-4">
            <div className="font-bold text-3xl">Import Books from Frappe</div>
            <div className="flex space-x-4">
                <Input type={"search"} placeholder="search by title" className="h-12 w-1/2" onChange={(e) => setTitle(e.target.value)} />
                <Input type="number" value={numberOfBooks} className="h-12 w-fit" onChange={(e) => setNumberOfBooks(parseInt(e.target.value))} />
                <Button className="w-[200px] h-12" onClick={handleSearchFrappe}>Import</Button>
            </div>
            {
                books.length > 0 &&
                <div className="flex flex-col">
                    <div className="font-bold text-lg py-4">Total Books: {books.length}</div>
                    {
                        books.map((book) => {
                            return (
                                <div>{book.book_title}</div>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
}