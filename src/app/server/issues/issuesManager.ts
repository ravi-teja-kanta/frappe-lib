import { IssueBookToMemberResponse, IssueDTO } from "@/models/issue";
import { toPaise, toRupees } from "@/models/transaction";
import { subDays } from "date-fns";
import _ from "lodash";
import { getOutStandingBalance } from "../members/memberManager";
import { getMember } from "../members/membersRepo";
import { insertTransaction } from "../transactions/transactionsRepo";
import {getAllIssuesOfDate, getIssueFromBookId, getIssuesFromMemberId, getIssuesByDates, insertIssue, markIssueAsInActive} from "./issuesRepo";

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

export async function getTodaysIssues() {
    return await getAllIssuesOfDate(new Date());
}

export async function getActiveIssuesOfMember(memberId: string) {
    const issues = await getIssuesFromMemberId(memberId);
    return issues;
}

export async function getLast14DaysOfIssues() {
    // ideally, such computed queries should be queried through a OLAP db, cached or generated on demand.
    const last14Dates = [];
    for(let i = 0; i<=14; i++) {
        last14Dates.push(subDays(new Date(), i))
    }
    const issues = await getIssuesByDates(last14Dates);

    const dateCount = _.groupBy(issues, (i) => i.issue_date);

    return Object.keys(dateCount).map(d => {
        return {
            "date": d,
            "count": dateCount[d].length
        }
    })
}