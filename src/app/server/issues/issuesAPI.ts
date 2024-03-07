import { IssueBookToMemberResponse, IssueDTO, IssueStatus } from "@/models/issue";
import { getIssue, issueBookToMember } from "./issuesManager";

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