import { toSupabaseDate } from "@/lib/date";
import supabase from "@/lib/supabase";
import { IssueCountDateWise, IssueDTO, IssueStatus } from "@/models/issue";
import { addDays } from "date-fns";

export async function getIssueFromBookId(bookId: string): Promise<IssueDTO | undefined> {
    
    const { data: issues, error } = 
        await supabase
            .from('issues')
            .select('*')
            .eq("issue_book_id", bookId)
            .eq("issue_is_active", true)
    
    if (error) throw Error(error.message)

    return issues?.pop();

}

export async function markIssueAsInActive(issueId: string): Promise<IssueDTO> {
    
    const { data, error } = 
        await supabase
            .from('issues')
            .update({ issue_is_active: false })
            .eq('id', issueId)
            .eq("issue_is_active", true)
            .select()
    if (error) throw Error(error.message);

    return data.pop();
        
}

export async function insertIssue(
    bookId: string,
    memberId: string,
    issueStatus: IssueStatus
): Promise<IssueDTO> {
    
    const { data, error } = 
        await supabase
            .from('issues')
            .insert([
                {
                    "issue_book_id": bookId,
                    "issue_member_id": memberId,
                    "issue_status": issueStatus,
                    "issue_date": new Date()
                },
            ])
            .select()
    
    if (error) throw Error(error.message);
    
    return data.pop();
}

export async function getIssuesFromMemberId(memberId: string): Promise<IssueDTO[]> {
    
    const { data: issues, error } = 
        await supabase
            .from('issues')
            .select('*')
            .eq("issue_member_id", memberId)
            .eq("issue_is_active", true)
            .eq("issue_status", "ISSUED_TO_MEMBER")
    
    if (error) throw Error(error.message)

    return issues;

}

export async function getAllIssuesOfDate(date: Date): Promise<IssueDTO[]> {
    const { data: issues, error } = 
        await supabase
            .from('issues')
            .select('*')
            .eq("issue_date", toSupabaseDate(date))
            .eq("issue_status", "ISSUED_TO_MEMBER");
    
    if (error) throw Error(error.message);
    return issues;
}

export async function getIssuesByDates(dates: Date[]): Promise<IssueDTO[]> {
    const isoDates = dates.map(toSupabaseDate);
    const { data: issues, error } = 
        await supabase
            .from('issues')
            .select('*')
            .in("issue_date", isoDates)
            .eq("issue_status", "ISSUED_TO_MEMBER")


    if (error) throw Error(error.message);
    
    return issues;
}
