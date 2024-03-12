import { TransactionWithMemberDTO } from "@/app/server/transactions/transactionsAPI"
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
                <div className="text-xs text-gray-500">{formatRelative(trans.transaction_created_at, new Date())}</div>
            </div>
        </div>
    )
}

export function RecentTransactions({trans}: any) {
    return (
        <div className="border rounded-lg p-4 h-fit w-1/2">
            <div className="font-semibold">Recent Transactions</div>
            <div className=" flex flex-col space-y-2 mt-2">
                {
                    trans?.map(TransactionListItem)
                }
            </div> 
        </div> 
    )
}