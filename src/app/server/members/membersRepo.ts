import supabase from "@/lib/supabase";

export async function getMember(memberId: string) {
    
    const { data: members, error } = 
        await supabase
            .from('members')
            .select("*")
            .eq('id', memberId);
    
    if (error) throw Error(error.message);

    
    return members.pop();
}