import { getAllIssuesOfMember } from "@/app/server/issues/issuesAPI";
import { getBooksToBeReturned, settleDues } from "@/app/server/members/memberAPI";
import { toRupees } from "@/app/server/transactions/transactionsRepo";
import { BookDTO } from "@/models/book";
import { IssueDTO } from "@/models/issue";
import { MemberDTO } from "@/models/member";
import { EyeOpenIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { ReturnsList } from "./book-return-list";
import Image from "next/image"
import noBooksToReturn from "../../../public/no_books_to_return.svg";


type MemberProps = {
    member: MemberDTO,
    borrowedBooks: BookDTO[],
    outStandingDues: number
}

type PaymentStatus = "NOT_STARTED" | "PAID" | "FAILED"
export default function MemberDetails({ member, borrowedBooks, outStandingDues }: MemberProps) {
    async function handlePay() {
        const isSettled = await settleDues(member.id);
        
        if (!isSettled) {
            setPaymentStatus("FAILED")
        } else {
            setPaymentStatus("PAID");
            setDues(0);
        }
    }
    const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("NOT_STARTED");
    const [dues, setDues] = useState<number>(outStandingDues);

    return (
        <div className="flex flex-col mt-6 mx-auto w-3/4 space-y-4">
            <div className="font-bold text-2xl">Member Profile</div>
            <div className="flex space-x-4 w-full mt-4">
                <Card className="w-1/3">
                    <CardHeader>
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">{member.member_name}</CardTitle>
                            <Badge variant={"available"}>Active</Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col space-y-1">
                        <CardDescription>{member.member_email}</CardDescription>
                        <CardDescription>91-{member.member_phonenumber}</CardDescription>
                    </CardContent>
                </Card>
                <Card className="w-1/3">
                    <CardHeader>
                        <CardDescription>Outstanding Dues</CardDescription>
                        <CardTitle className="text-2xl">{toRupees(dues)} INR</CardTitle>
                    </CardHeader>
                    <CardFooter>
                        {
                            (paymentStatus !== "PAID" && dues > 0) && 
                            <div>
                                <Button className="ml-auto w-[80px]" onClick={handlePay}>Pay</Button>
                                {
                                    paymentStatus === "FAILED" && <div className="text-red-900 text-sm"> Something went wrong</div>
                                }
                            </div>
                        }
                        {
                            paymentStatus === "PAID" && <div className="text-green-700"> All dues Paid !</div>
                        }
                        
                    </CardFooter>
                </Card>
                <Card className="w-1/3">
                    <CardHeader>
                        <CardDescription>Books to Return</CardDescription>
                        <CardTitle className="text-2xl">{borrowedBooks.length}</CardTitle>
                    </CardHeader>
                    <CardFooter>
                        {/* <Button className="ml-auto w-[80px]" onClick={handleViewBorrowHistory}>Return</Button> */}
                    </CardFooter>
                </Card>
            </div>
            {/* <Separator /> */}
            {
                (borrowedBooks.length > 0) && <ReturnsList memberId={member.id} books={borrowedBooks} />
                
            }
        </div>
    )
}