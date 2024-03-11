"use client"
import { getBooksToBeReturned, getMember } from "@/app/server/members/memberAPI"
import { getOutStandingBalance } from "@/app/server/members/memberManager"
import { BookDTO } from "@/models/book"
import { MemberDTO } from "@/models/member"
import { PlusIcon } from "@radix-ui/react-icons"
import { useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import MemberDetails from "./member-details"
import Image from "next/image"
import emptyMembers from "../../../public/member_search.svg";
import { useRouter } from "next/navigation"

export default function MembersTab() {
    async function handleGetMemberDetails() {
        if (!memberId || memberId==="") return;
        const member = await getMember(memberId);
        if (!member) {
            alert("member Id not found")
            return
        }
        const borrowedBooks = await getBooksToBeReturned(member.id);
        const outStandingDues = await getOutStandingBalance(member.id);
        setMember(member);
        setBorrowedBooks(borrowedBooks);
        setOutstandingDues(outStandingDues);
    }
    const [member, setMember] = useState<MemberDTO>();
    const [memberId, setMemberId] = useState<string>();
    const [borrowedBooks, setBorrowedBooks] = useState<BookDTO[]>();
    const [outStandingDues, setOutstandingDues] = useState<number>();
    const router = useRouter();
    return (
        <div className="flex flex-col px-12 p-6 justify-around">
           <div className="flex justify-center space-x-2 w-full">
            <div className="flex flex-col space-y-1">
                <Label className="text-lg font-semibold">Search Member</Label>
                <Input type={"text"} placeholder="Member Id" className="w-[400px]" onChange={(e) => setMemberId(e.target.value)}/>
            </div>
                <Button className="mt-auto" onClick={handleGetMemberDetails}>
                    Get Member Profile
                </Button>
                <Button variant={"outline"} className="mt-auto px-6" onClick={() => router.push("/add_new_member")}>
                    <PlusIcon className="mr-1"/>
                    Add New Member
                </Button>
           </div>
           {
                (member && borrowedBooks && outStandingDues !== undefined) ? 
                <MemberDetails member={member} borrowedBooks={borrowedBooks} outStandingDues={outStandingDues} /> // add empty image later
                : <Image src={emptyMembers} alt={""} width={300} className="mx-auto mt-16" />
           }
        </div>
    )
}