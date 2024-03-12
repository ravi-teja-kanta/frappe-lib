import { MemberDTO } from "@/models/member";
import { TransactionDTO } from "@/models/transaction";
import { getTodaysTransactions } from "./transactionsManager";

export type TransactionWithMemberDTO = TransactionDTO & MemberDTO;

export async function getAllTransactionsForToday(): Promise<TransactionWithMemberDTO[]> {
    try {
        return await getTodaysTransactions();
    } catch(e) {
        console.error(JSON.stringify(e))
        return [];
    }
}