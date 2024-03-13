import { TransactionWithMemberDTO } from "@/app/server/transactions/transactionsAPI";
import { toRupees } from "@/models/transaction";
import { AvatarIcon, DownloadIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "../ui/card";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../ui/dropdown-menu";
import { RecentTransactions } from "./recent-transactions";
import { StatsNav } from "./stats-nav-overview-tab";
import { WeeklyStatsChart } from "./weekly-stats-chart";


export function OverViewTab({numberOfIssues, newRegistrations, trans, dayWiseIssueCount}: any) {
    
	const totalRevenue = toRupees(trans.reduce((acc: number, curr: TransactionWithMemberDTO) => { acc += curr.transaction_amount; return acc}, 0))

    return (
        <div className="flex flex-col mx-auto w-3/4 space-y-2">
            <div className="text-slate-400 mt-2">{"Today's Stats"}</div>
            
            <StatsNav numberOfIssues={numberOfIssues} totalRevenue={totalRevenue} newRegistrations={newRegistrations} />
            <div className="flex space-x-2">
                <WeeklyStatsChart dayWiseIssueCount={dayWiseIssueCount} />
                
                <RecentTransactions transactionsWithMemberDetails={trans} />  
            </div>
            

        </div>
    )
}