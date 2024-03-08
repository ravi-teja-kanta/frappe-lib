import { returnBook } from "@/app/server/members/memberAPI"
import { BookDTO } from "@/models/book"
import { IssueDTO } from "@/models/issue"
import { Separator } from "@radix-ui/react-separator"
import { useState } from "react"
import { Button } from "../ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

type BookReturnListProps = {
    memberId: string,
    books: BookDTO[]
}

export function ReturnsList({memberId, books}: BookReturnListProps) {
    
    function ReturnsListItem(book: BookDTO) {
        async function handleReturn(bookId: string) {
            const { isBookReturned, reason } = await returnBook(bookId, memberId);
            if (isBookReturned)  {
                setMessage("Book Returned!")
                setIsBookReturned(true);
            }
            else alert("something went wront")
        }
        const [message, setMessage] = useState<string>();
        const [isBookReturned, setIsBookReturned] = useState<boolean>();

        return (
            <TableRow key={book.book_book_id}>
                <TableCell className="font-medium">{book.book_book_id}</TableCell>
                <TableCell>{book.book_title}</TableCell>
                <TableCell>{book.book_publisher}</TableCell>
                <TableCell className="text-right w-fit">
                    {
                        isBookReturned ? <div className="text-green-600 p-1">{message}</div>
                        :<Button variant={"outline"} onClick={() => handleReturn(book.id!!)}>Return</Button>
                    }
                </TableCell>
            </TableRow>
        )
    }
    return (
        <div className="flex flex-col w-full border p-6 rounded">
            <div className="text-2xl font-bold mb-4">Borrow History</div>
            <Table>
            {/* <TableCaption> Borrow History </TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Publisher</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {books.map(ReturnsListItem)}
            </TableBody>
        </Table>
        </div>
    )
}