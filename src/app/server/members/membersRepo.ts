import supabase from "@/lib/supabase";
import { MemberDTO } from "@/models/member";
import { addDays, subDays } from "date-fns";

export async function getMember(memberId: string) {
    
    const { data: members, error } = 
        await supabase
            .from('members')
            .select("*")
            .eq('id', memberId);
    
    if (error) throw Error(error.message);

    
    return members.pop();
}

export async function insertMember(member: MemberDTO): Promise<MemberDTO> {

    const { data, error } = 
        await supabase
            .from('members')
            .insert([
                member
            ])
            .select();
    
    if(error) throw Error(error.message);

    return data?.pop();
        
}

export function toMemberDTO(details: any): MemberDTO {
    return {
        member_email: details["email"]!!,
        member_name: details["firstName"]!! + " " + details["lastName"] || "",
        member_phonenumber: details["phoneNumber"]!!
    }
}

export async function getMembersByDate(date: Date) {
    
    const nextDay = addDays(date, 1);
    
    const { data: members, error } = 
        await supabase
            .from('members')
            .select("*")
            .lte('member_created_at', nextDay.toISOString())
            .gte('member_created_at', date.toISOString().slice(0, 10))

    if (error) throw Error(error.message);
    
    return members;
}

export async function getMembersDetails(memberIds: string[]): Promise<MemberDTO[]> {
    
    let { data: members, error } = 
        await supabase
            .from('members')
            .select("*")
            .in('id', memberIds);

    if (error) throw Error(error.message);
    
    return members || [];
}
