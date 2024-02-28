import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"

export default function MembersTab() {
    const sampleBooks = [
        {
            "bookID": "41909",
            "title": "Harry Potter ve Sırlar Odası (Harry Potter  #2)",
            "authors": "J.K. Rowling/Sevin Okyay",
            "average_rating": "4.42",
            "isbn": "3570211029",
            "isbn13": "9783570211021",
            "language_code": "tur",
            "  num_pages": "403",
            "ratings_count": "1000",
            "text_reviews_count": "41",
            "publication_date": "10/1/2001",
            "publisher": "Yapı Kredi Yayınları"
            },
            {
            "bookID": "8",
            "title": "Harry Potter Boxed Set  Books 1-5 (Harry Potter  #1-5), Harry Potter Boxed Set  Books 1-5 (Harry Potter  #1-5)",
            "authors": "J.K. Rowling/Mary GrandPré",
            "average_rating": "4.78",
            "isbn": "0439682584",
            "isbn13": "9780439682589",
            "language_code": "eng",
            "  num_pages": "2690",
            "ratings_count": "41428",
            "text_reviews_count": "164",
            "publication_date": "9/13/2004",
            "publisher": "Scholastic"
            },
    ]
    return (
        <div className="flex border p-6 mt-6 justify-around">
            <div className="flex flex-col space-y-4 w-3/4">
                <Input type="search" placeholder="search by title, author or bid" className="h-12"/>
                <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Rating</TableHead>
                            {/* <TableHead className="text-right"></TableHead> */}
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                        {
                            sampleBooks.map((book) => {
                                return (
                                    <TableRow className="p-4">
                                        <TableCell className="font-medium">{book.bookID}</TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.authors}</TableCell>
                                        <TableCell>{book.average_rating}</TableCell>
                                        <TableCell className="text-right pl-4">
                                            <Button variant="secondary">
                                                <ChevronRightIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            })    
                        }
                        </TableBody>
                </Table>
            </div>
            <Button className="mt-2">
                <PlusIcon  className="h-4 w-4 mr-2"/>
                Add Books
            </Button>
        </div>
    )
}