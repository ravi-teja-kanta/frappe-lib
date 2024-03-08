import { IssueBookToMemberResponse, IssueDTO } from "@/models/issue";
import { getOutStandingBalance } from "../members/memberManager";
import { getMember } from "../members/membersRepo";
import { insertTransaction, toPaise, toRupees } from "../transactions/transactionsRepo";
import {getIssueFromBookId, getIssuesFromMemberId, insertIssue, markIssueAsInActive} from "./issuesRepo";

export async function getIssue(bookId: string) {
    return await getIssueFromBookId(bookId)   
}

export async function issueBookToMember(bookId: string, memberId: string, rentFeeInRupees: number): Promise<IssueBookToMemberResponse> {

    let response: IssueBookToMemberResponse = {
        isBookIssued: false,
    }
    // check if memberId is legit
    const member = await getMember(memberId);
    
    if (!member) {
        response.reason = "Member Id does not exist"
        return response;
    }
    // check if member due fees is under 500
    const memberOutstandingBalance = await getOutStandingBalance(memberId);
    if (memberOutstandingBalance + toPaise(rentFeeInRupees) > 500_00) {
        response.reason = `Member outstanding balance is Rs.${toRupees(memberOutstandingBalance)}, it cannot exceed 500 INR`
        return response
    }
    // check if book is available (last issual status)
    const issue = await getIssueFromBookId(bookId);

    if(!issue) {
        await insertIssue(bookId, memberId, "ISSUED_TO_MEMBER");
        await insertTransaction(memberId, "SYSTEM_LENT", rentFeeInRupees * 100)
        response.isBookIssued = true;
    }
    else if (issue && issue.issue_status !== "AVAILABLE") {
        response.reason = "Book is Not Available"
    }
    // register new issual, mark last issual as inactive if present
    else if (issue && issue.issue_status === "AVAILABLE") {
        // Since, this is a sigle user system for now. I am not hadling missing and multiple writes. Ideally, this should be wrapped in a db transaction.
        await markIssueAsInActive(bookId);
        await insertIssue(bookId, memberId, "ISSUED_TO_MEMBER");
        await insertTransaction(memberId, "SYSTEM_LENT", rentFeeInRupees * 100);

        response.isBookIssued = true;
    }

    return response;
}

export async function getActiveIssuesOfMember(memberId: string) {
    const issues = await getIssuesFromMemberId(memberId);
    return issues;
}