"use client"

import { searchBooks, toBook } from "@/app/server/books/booksRepo";
import { getLatestIssueStatusofBook } from "@/app/server/issues/issuesAPI";
import { Book, BookDTO } from "@/models/book";
import { ChevronRightIcon, PlusIcon, StarIcon, StarFilledIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import BookList from "./book-list";



export default function BooksTab() {
    async function handleSearchBooks(e: any) {
        if (e.target.val === "") return
        
        const searchRes = await searchBooks(e.target.value);
        
        if (searchRes.length) setBooks(searchRes.map(toBook))
        
    }

    const [books, setBooks] = useState<Book[]>([]);
    const router = useRouter()
    
    return (
        <div className="flex p-6 mt-6 justify-around">
            <div className="flex flex-col space-y-4 w-3/4">
                <div className="flex justify-between pb-">
                    <div className="font-bold text-3xl">Search Books</div>
                    <Button className="" variant={"outline"} onClick={() => router.push("/add_new_books")}>
                        <PlusIcon  className="h-4 w-4 mr-2"/>
                        <div className="">Add Books From Frappe</div>
                    </Button>
                </div>
                <Input type="search" placeholder="by title or author" className="h-12" onChange={handleSearchBooks}/>
                {
                    books.length > 0 ?   
                    <BookList books={books} />
                    : <div className=" text-slate-400">Search full words like "harry" , "rowling" or "shakespeare"</div>
                }
            </div>
        </div>
    )
}