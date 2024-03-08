export type IssueDTO = {
    id?: string,
    issue_book_id: string,
    issue_member_id: string,
    issue_status: IssueStatus,
    issue_date: Date
}

export type IssueStatus = "ISSUED_TO_MEMBER" | "AVAILABLE" | "DAMAGED_OR_MISSING";

export type IssueBookToMemberResponse = {
    isBookIssued: boolean,
    reason?: string,
}