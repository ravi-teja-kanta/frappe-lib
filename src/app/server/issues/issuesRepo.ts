import supabase from "@/lib/supabase";
import { IssueDTO, IssueStatus } from "@/models/issue";

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
            .eq('issue_book_id', issueId)
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