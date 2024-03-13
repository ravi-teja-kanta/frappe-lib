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
import Image from "next/image"
import emptyBooks from "../../../public/search_empty.svg";

export default function BooksTab() {
    async function handleSearchBooks(searchStr: string) {
        if (!searchStr || searchStr === "") return;
        
        const searchRes = await searchBooks(searchStr);
        
        setBooks(searchRes.map(toBook))
        
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
                <Input type="search" placeholder="by title or author" className="h-12" onChange={(e) => handleSearchBooks(e.target.value)}/>
                {
                    books.length > 0 ?   
                    <BookList books={books} />
                    :   <div className="flex flex-col space-y-4">
                            <div className=" text-slate-400">
                                Search full words like harry, rowling or shakespeare
                                
                            </div>
                            <Image src={emptyBooks} alt={""} width={350} className="mx-auto" />
                        </div>
                    
                }
            </div>
        </div>
    )
}