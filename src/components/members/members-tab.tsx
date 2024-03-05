import { ChevronRightIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"

type Member = {
    memberId: string,
    memberName: string,
}
export default function MembersTab() {
    const sampleMembers: Member[] = [
        {
            memberId: "345",
            memberName: "ravi"
        },
        {
            memberId: "789",
            memberName: "chintu"
        },
        {
            memberId: "123",
            memberName: "Jam Jam"
        }
    ]
    
    return (
        <div className="flex p-6 mt-6 justify-around">
            <div className="flex flex-col space-y-4 w-3/4">
                <div className="flex justify-between pb-">
                    <div className="font-bold text-3xl">Search Members</div>
                    <Button className="w-1/6" variant={"destructive"}>
                        <PlusIcon  className="h-4 w-4 mr-2"/>
                        <div className="">Add New Member</div>
                    </Button>
                </div>
                <Input type="search" placeholder="by member id" className="h-12"/>
                {
                    sampleMembers.length > 0 ?   
                    <Table className="mt-6">
                        <TableHeader>
                            <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Name</TableHead>
                            {/* <TableHead>Rating</TableHead> */}
                            {/* <TableHead className="text-right"></TableHead> */}
                            </TableRow>
                        </TableHeader>
                        
                        <TableBody>
                        {
                            sampleMembers.map((member) => {
                                return (
                                    <TableRow className="p-4" key={member.memberId}>
                                        <TableCell className="font-medium">{member.memberId}</TableCell>
                                        <TableCell className="font-medium">{member.memberName}</TableCell>
                                        {/* <TableCell>{book.rating}</TableCell> */}
                                        <TableCell className="text-right pl-4">
                                            {/* <IssueModal book={book} /> */}
                                            <Button variant={"secondary"}>
                                                <ChevronRightIcon className="w-4 h-4" />
                                            </Button>
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