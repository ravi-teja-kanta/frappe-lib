import _ from "lodash";
import { getBooksDetails } from "../books/booksRepo";
import { getLatestIssueStatusofBook } from "../issues/issuesAPI";
import { getActiveIssuesOfMember } from "../issues/issuesManager";
import { insertIssue, markIssueAsInActive } from "../issues/issuesRepo";
import { getAllTransactions, insertTransaction } from "../transactions/transactionsRepo";
import { getMember, insertMember, toMemberDTO } from "./membersRepo";

export async function getOutStandingBalance(memberId: string) {
    const transactions = await getAllTransactions(memberId);
    
    const {SYSTEM_LENT: creditTransactions, MEMBER_PAID: debitTransactions} = _.groupBy(transactions, t => t.transaction_type)
    const totalCredit = _.sumBy(creditTransactions, t => t.transaction_amount)
    const totalDebit = _.sumBy(debitTransactions, t => t.transaction_amount)

    return totalCredit - totalDebit;
}

export async function getMemberDetails(memberId: string) {
    return await getMember(memberId);
}


export async function getAllActiveIssuesAndBookDetails(memberId: string) {
    const issues = await getActiveIssuesOfMember(memberId);
    const bookIds = issues.map(i => i.issue_book_id);
    const booksDetails = await getBooksDetails(bookIds);

    return booksDetails;
}

export async function markBookAsAvailable(bookId: string, memberId: string) {
    const latestIssue = await getLatestIssueStatusofBook(bookId);
    if (!latestIssue) throw new Error("Issue against this return does not exist");

    await markIssueAsInActive(latestIssue.id!!);
    return await insertIssue(bookId, memberId, "AVAILABLE");
    
}

export async function settleMemberDues(memberId: string) {
    const outstandingDue = await getOutStandingBalance(memberId);
    await insertTransaction(memberId, "MEMBER_PAID", outstandingDue);
}

export async function addNewMemberDetails(memberDetails: any) {
    const member = toMemberDTO(memberDetails);
    return await insertMember(member);
}