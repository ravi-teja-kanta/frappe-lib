import { Book } from "@/models/book/book";
import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

type IssueModalProp = {
    book: Book
}
function IssueModal({ book }: IssueModalProp) {
    return (
        <Dialog>
            <DialogTrigger>
                <Button variant="secondary">
                    issue
                    <ChevronRightIcon />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Issue Book #{book.id}</DialogTitle>
                <DialogDescription>
                    Whom do you want to issue this book to ?
                </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-2">
                    <Label htmlFor="member_id">Member Id</Label>
                    <Input id="member_id" type="text" placeholder="Enter member Id"  />
                </div>
                <DialogFooter>
                    <Button type="submit" className="font-bold">Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default function BooksTab() {
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
            {
                "bookID": "8",
                "title": "Harry Potter Boxed Set  Books 1-5 (Harry Potter  #1-5)",
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
                {
                "bookID": "2",
                "title": "Harry Potter and the Order of the Phoenix (Harry Potter  #5)",
                "authors": "J.K. Rowling/Mary GrandPré",
                "average_rating": "4.49",
                "isbn": "0439358078",
                "isbn13": "9780439358071",
                "language_code": "eng",
                "  num_pages": "870",
                "ratings_count": "2153167",
                "text_reviews_count": "29221",
                "publication_date": "9/1/2004",
                "publisher": "Scholastic Inc."
                },
    ];
    const books: Book[] = sampleBooks.map((book) => {
        return {
            id: book.bookID,
            title: book.title,
            authors: book.authors.split("/"),
            publisher: book.publisher,
            rating: Number(book.average_rating)
        }
    })
    return (
        <div className="flex p-6 mt-6 justify-around">
            <div className="flex flex-col space-y-4 w-3/4">
                <div className="flex justify-between pb-">
                    <div className="font-bold text-3xl">Search Books</div>
                    <Button className=" w-1/6" variant={"destructive"}>
                        <PlusIcon  className="h-4 w-4 mr-2"/>
                        <div className="">Import</div>
                    </Button>
                </div>
                <Input type="search" placeholder="by title, author or id ..." className="h-12"/>
                {
                    books.length > 0 ?   
                    <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            {/* <TableHead>Rating</TableHead> */}
                            {/* <TableHead className="text-right"></TableHead> */}
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                        {
                            books.map((book) => {
                                return (
                                    <TableRow className="py-4" key={book.id}>
                                        <TableCell className="font-medium">{book.id}</TableCell>
                                        <TableCell>{book.title}</TableCell>
                                        <TableCell>{book.authors.join()}</TableCell>
                                        {/* <TableCell>{book.rating}</TableCell> */}
                                        <TableCell className="text-right pl-4">
                                            <IssueModal book={book} />
                                            {/* <Button variant={"secondary"}>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Button> */}
                                        </TableCell>
                                    </TableRow>
                                )
                            })    
                        }
                        </TableBody>
                    </Table>
                    : null
                }
            </div>
            {/* <Button className=" w-1/6">
                <PlusIcon  className="h-4 w-4 mr-2"/>
                <div className="">Import</div>
            </Button> */}
        </div>
    )
}