import supabase from "@/lib/supabase";
import { MemberDTO } from "@/models/member";

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