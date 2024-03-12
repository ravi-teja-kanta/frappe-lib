import BooksTab from "@/components/books/books-tab";
import MembersTab from "@/components/members/members-tab";
import { OverViewTab } from "@/components/reports/overview-tab";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IssueDTO } from "@/models/issue";
import { toRupees, TransactionDTO } from "@/models/transaction";
import { AvatarIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import { getAllIssuesOfToday, getDayWiseIssueCount } from "./server/issues/issuesAPI";
import { getAllNewMemberRegistrationsForToday } from "./server/members/memberAPI";
import { getAllTransactionsForToday, TransactionWithMemberDTO } from "./server/transactions/transactionsAPI";

export default async function Home() {
	const issues = await getAllIssuesOfToday();
	const newRegs = await getAllNewMemberRegistrationsForToday()
	const trans = await getAllTransactionsForToday();
	const dayWiseIssueCount = await getDayWiseIssueCount();

	const totalRevenue = toRupees(trans.reduce((acc: number, curr: TransactionWithMemberDTO) => { acc += curr.transaction_amount; return acc}, 0))
  	return (
		<main className="flex min-h-screen flex-col p-12">
			<div>
				<div className="flex justify-between">
					<div className="font-bold text-3xl my-auto">
						Dashboard
					</div>
					<Card className="cursor-pointer">
						<CardHeader>
								<CardTitle className="flex">
									<div className="my-auto">Frappe Admin</div>
									<div className="ml-2">
										<AvatarIcon className="w-5 h-5" />
									</div>
								</CardTitle>
						</CardHeader>
					</Card>
				</div>
				<Tabs defaultValue="overview" className="">
					<TabsList>
						<TabsTrigger value="overview">Overview</TabsTrigger>
						<TabsTrigger value="books">Books</TabsTrigger>
						<TabsTrigger value="members">Members</TabsTrigger>
					</TabsList>
					<TabsContent value="overview">
						
						<OverViewTab numberOfIssues={issues.length} totalRevenue={totalRevenue} newRegistrations={newRegs.length} trans={trans} dayWiseIssueCount={dayWiseIssueCount} />
						
						
					</TabsContent>
					<TabsContent value="books">
						<BooksTab />
					</TabsContent>
					<TabsContent value="members">
						<MembersTab />
					</TabsContent>
					</Tabs>
			</div>
		
		</main>
  	);
}
