import { MemberDTO } from "@/models/member";
import { TransactionDTO } from "@/models/transaction";
import _ from "lodash";
import { getMemberDetails } from "../members/memberManager";
import { getMembersDetails } from "../members/membersRepo";
import { TransactionWithMemberDTO } from "./transactionsAPI";
import { getTodaysTransactionsWithMemberDetails, getTransactionsByDate } from "./transactionsRepo";


export async function getTodaysTransactions(): Promise<TransactionWithMemberDTO[]> {
    const trans =  await getTransactionsByDate(new Date());
    // console.log(trans)
    const memberIds = trans.map(t => t.transaction_member_id);
    const memberDetails = await getMembersDetails(memberIds);

    const transactionsWithMemberDetails = trans.map((t: TransactionDTO) => {
        const member = _.find(memberDetails, m => m.id === t.transaction_member_id);

        return {
            ...member,
            ...t
        } as TransactionWithMemberDTO
    });

    return transactionsWithMemberDetails;


}