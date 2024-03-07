import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeftIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import { PageProps } from "../../../.next/types/app/layout";
import { getBookProfile } from "../server/books/booksAPI";
import { getLatestIssueStatusofBook } from "../server/issues/issuesAPI";

export default async function Page({ searchParams }: PageProps) {
    const bookId = searchParams["bookId"]!!;
    const book = await getBookProfile(bookId);
    const status = await getLatestIssueStatusofBook(book.book_book_id);
    
    return (
        <div className="p-12 flex flex-col">
            {/* <BackButton>
                <ArrowLeftIcon className="border w-8 h-8 rounded" />
            </BackButton> */}
            <Card className=" w-1/2 mx-auto">
                <CardHeader>
                    <CardTitle className="text-xl">{book.book_title}</CardTitle>
                    <CardDescription className="text-lg flex justify-between py-4">
                        {JSON.parse(book.book_authors).join()}
                        {/* <Badge variant={"outline"} className="bg-green-700">{status}</Badge> */}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex space-x-2">
                        {/* <Label htmlFor="member_id">Member Id</Label> */}
                        <Input id="member_id" type={"text"} placeholder="member id" />
                        <Button variant={"secondary"}>Issue Book</Button>
                    </div>
                </CardContent>
                <CardFooter>
                    
                </CardFooter>
            </Card>
        </div>
    )
}