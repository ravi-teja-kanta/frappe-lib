import { getLatestIssueStatusofBook } from "@/app/server/issues/issuesAPI"
import { Book } from "@/models/book"
import { IssueDTO } from "@/models/issue"
import { ChevronDownIcon, ChevronRightIcon, StarFilledIcon } from "@radix-ui/react-icons"
import { Label } from "@radix-ui/react-label"
import { useState } from "react"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "../ui/card"
import { Input } from "../ui/input"
import { Separator } from "../ui/separator"
import IssueBook from "./issue-book"

type BookListProps = {
    books: Book[]
}

function BookListItem(book: Book) {
    async function handleIssueBook() {
        if (issueBook) {
            setIssueBook(false);
            return
        }
        setIssueBook(true);
        setIsLoading(true);
        const issue  = await getLatestIssueStatusofBook(book.id!!);
        setIsLoading(false);
        setIssue(issue);
    }

    const [issueBook, setIssueBook] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [issue, setIssue] = useState<IssueDTO>();
    
    return (
        <Card className="">
            <CardHeader>
                <div className="flex justify-between">
                    <CardTitle>{book.title}</CardTitle>
                    {/* <div className="text-sm">{book.rating}</div> */}
                    <Badge className="px-1 h-fit text-sm" variant={"secondary"}>
                        {book.rating.toPrecision(2)}
                        <StarFilledIcon className="h-3" />
                    </Badge>
                </div>
                <CardDescription>{book.authors.join(", ")}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between w-full">
                    <div className="flex space-x-2 h-fit mt-auto">
                        <Badge>{book.publisher}</Badge>
                        <Badge variant={"outline"}>{book.numOfPages} pages</Badge>
                        <Badge variant={"outline"}>{book.language}</Badge>
                    </div>
                    
                    <Button className="w-1/5 h-fit" variant={"outline"} onClick={handleIssueBook}>
                        issue book
                        <ChevronDownIcon className="ml-auto" />
                    </Button>
                </div>
            </CardContent>
            {
                issueBook &&
                <CardFooter>
                    
                    {
                        isLoading ? <div className="w-full text-center mt-4">Loading...</div>
                        :<div className="flex flex-col w-full">
                            <Separator  className="mb-4"/>
                            {
                                (!issue || issue.issue_status === "AVAILABLE") &&
                                <div className="flex justify-between">
                                    <Badge variant={"available"} className="px-2 py-1 h-fit">Book Available</Badge>
                                    <IssueBook book={book}/>
                                </div>
                            }
                            {
                                issue?.issue_status === "ISSUED_TO_MEMBER" &&
                                <div className="flex justify-between">
                                    <Badge variant={"available"} className="px-2 py-1 bg-red-900">Book Not Available</Badge>
                                    <div className="text-sm">{"Last issued on" + issue?.issue_date.toString()}</div>
                                </div>
                            }
                        </div>
                    }
                </CardFooter>
            }
            
        </Card>
    )
}

export default function BookList({ books }: BookListProps) {
    return (
        <div className="flex flex-col space-y-4">
            {
                books.map(BookListItem)
            }
        </div>
    )
}