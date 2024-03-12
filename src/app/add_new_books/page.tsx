"use client"

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Book, BookDTO } from "@/models/book";
import { ArrowLeftIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { importBooks } from "../server/books/booksAPI";
import { getBooks } from "../server/books/booksRepo";

export default function Page() {
    const [title, setTitle] = useState<string>("");
    const [numberOfBooks, setNumberOfBooks] = useState<number>(1);

    const [books, setBooks] = useState<BookDTO[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();

    async function handleSearchFrappe() {
        setIsLoading(true);
        let {status, message, books} = await importBooks(title, numberOfBooks);
        // alert(status + " " + message);
        setIsLoading(false)
        setBooks(books!!);
    }
    const router = useRouter()
    return (
        <div className="flex flex-col p-12 space-y-4">
            <Button variant={"outline"} className="mr-auto" onClick={() => router.back()}>
                <ArrowLeftIcon className="mr-2"></ArrowLeftIcon>
                Back
            </Button>
            <div className="w-3/4 mx-auto">
                <div className="font-bold text-3xl">Import Books from Frappe</div>
                <div className="flex space-x-4 mt-6">
                    <div className="h-12 w-1/2">
                        <Label>Search</Label>
                        <Input id="search" type={"search"} placeholder="by title" className="h-12" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <Label>Number of Books</Label>
                        <Input type="number" value={numberOfBooks} className="h-12 w-fit" onChange={(e) => setNumberOfBooks(parseInt(e.target.value))} />
                    </div>
                    <Button className="w-[200px] h-12 mt-auto" onClick={handleSearchFrappe}>Import</Button>
                </div>
                {
                    isLoading && <div className="text-center mt-24">Importing from Frappe...</div>
                }
                {
                    books.length > 0 &&
                    <div className="flex flex-col space-y-2 items-center mt-4">
                        <div className="p-4 text-green-700">Successfully Imported The Following {books.length} Book(s)</div>
                        {
                            books.map((book) => {
                                return (
                                    <Card className="w-1/2 ">
                                        <CardHeader>
                                            <CardTitle>{book.book_title}</CardTitle>
                                            <CardDescription>{book.book_authors}</CardDescription>
                                        </CardHeader>            
                                    </Card>
                                )
                            })
                        }
                    </div>
                }
            </div>
            
        </div>
    )
}