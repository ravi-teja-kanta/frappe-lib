import { TransactionWithMemberDTO } from "@/app/server/transactions/transactionsAPI"
import { toSupabaseDate } from "@/lib/date"
import { toRupees, TransactionDTO } from "@/models/transaction"
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

function TransactionListItem(trans: TransactionWithMemberDTO) {
    return (
        <div className="flex justify-between w-full border p-4 rounded-lg">
            <div>
                <div className="text-sm">{trans.member_name}</div>
                <div className="text-xs text-gray-500">{trans.member_email}</div>
            </div>
            <div>
                <div className="text-sm my-auto text-end">Rs. {toRupees(trans.transaction_amount)}</div>
                <div className="text-xs text-gray-500">{formatRelative(trans.transaction_created_at, toSupabaseDate(new Date()))}</div>
            </div>
        </div>
    )
}

type RecentTransactionsProps = {
    transactionsWithMemberDetails: TransactionWithMemberDTO[]
}

export function RecentTransactions({transactionsWithMemberDetails}: RecentTransactionsProps) {
    return (
        <div className="border rounded-lg p-4 h-fit w-1/2">
            <div className="font-semibold">Recent Transactions</div>
            
            <div className=" flex flex-col space-y-2 mt-2">
                {
                    transactionsWithMemberDetails?.length > 0 ?
                    transactionsWithMemberDetails.map(TransactionListItem)
                    : <div className="text-sm mt-4 text-center text-slate-400">No transactions today</div>
                }
            </div> 
        </div> 
    )
}