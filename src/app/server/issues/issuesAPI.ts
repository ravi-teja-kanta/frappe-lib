import { IssueBookToMemberResponse, IssueCountDateWise, IssueDTO, IssueStatus } from "@/models/issue";
import { getActiveIssuesOfMember, getIssue, getLast14DaysOfIssues, getTodaysIssues, issueBookToMember } from "./issuesManager";

export async function getLatestIssueStatusofBook(bookId: string): Promise<IssueDTO | undefined> {
    const issue = await getIssue(bookId);

    return issue;
}

export async function issueBook(bookId: string, memberId: string, rentFeeInRupees: number): Promise<IssueBookToMemberResponse> {
    try {
        const resp = await issueBookToMember(bookId, memberId, rentFeeInRupees);
        return resp;
    } catch(e) {
        console.error(e);
        return {
            isBookIssued: false,
            reason: "Internal Issue"
        }
    }
}

export async function getAllIssuesOfMember(memberId: string) {
    try {
        const resp = await getActiveIssuesOfMember(memberId);
        return resp;
    } catch(e) {
        console.error(e);
        return []
    }
}

export async function getAllIssuesOfToday() {
    try {
        const resp = await getTodaysIssues();
        return resp;
    } catch(e) {
        console.error(e);
        return []
    }
}

export async function getDayWiseIssueCount(): Promise<IssueCountDateWise[]> {
    try {
        return await getLast14DaysOfIssues();
    } catch(e) {
        console.error(e);
        return []
    }
}