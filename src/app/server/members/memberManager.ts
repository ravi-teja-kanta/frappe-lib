import _ from "lodash";
import { getAllTransactions } from "../transactions/transactionsRepo";

export async function getOutStandingBalance(memberId: string) {
    const transactions = await getAllTransactions(memberId);
    
    const {SYSTEM_LENT: creditTransactions, MEMBER_PAID: debitTransactions} = _.groupBy(transactions, t => t.transaction_type)
    const totalCredit = _.sumBy(creditTransactions, t => t.transaction_amount)
    const totalDebit = _.sumBy(debitTransactions, t => t.transaction_amount)

    return totalCredit - totalDebit;
}