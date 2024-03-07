import { issueBook } from "@/app/server/issues/issuesAPI";
import { Book } from "@/models/book";
import { IssueBookToMemberResponse } from "@/models/issue";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

type IssueBookProps = {
    book: Book
}
export default function IssueBook({ book }: IssueBookProps) {
    async function handleIssueBook() {
        if (!memberId || memberId === "" || !rentFeeInRupees || !book.id) return;
        
        const resp = await issueBook(book.id, memberId, rentFeeInRupees);
        setResp(resp);
    }
    const [memberId, setMemberId] = useState<string>();
    const [resp, setResp] = useState<IssueBookToMemberResponse>();
    const [rentFeeInRupees, setRentFeeInRupees] = useState<number>();

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>Issue This Book</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div>
                    <Label className="text-xs ml-1">Member Id</Label>
                    <Input type={"text"} placeholder="Member Id" className="w-full" onChange={(e) => setMemberId(e.target.value)}/>
                </div>
                <div>
                    <Label className="text-xs">Rent Fee</Label>
                    <Input type={"number"} placeholder="Rate in INR" className="w-full" onChange={(e) => setRentFeeInRupees(parseInt(e.target.value))}/>
                </div>
                
            </CardContent>
            <CardFooter className="flex flex-col">
                <Button className="w-full mx-auto my-4" onClick={handleIssueBook}>Issue</Button>
                {
                    resp?.isBookIssued ?
                    <div className="text-green-800 text-sm">
                        Book Issued Successfully.
                    </div>
                    :
                    <div className=" text-red-800 text-sm w-fit">
                        {resp?.reason}
                    </div>

                }
                {/* <Button className="h-7 ml-auto" onClick={handleIssueBook}>Issue</Button> */}
            </CardFooter>
        </Card>
        
    )
}