import supabase from "@/lib/supabase";
import { TransactionDTO, TransactionType } from "@/models/transaction";

export async function getAllTransactions(memberId: string): Promise<TransactionDTO[]> {
    
    const { data: transactions, error } = 
        await supabase
            .from('transactions')
            .select("*")
            .eq("transaction_member_id", memberId);

    if (error) throw Error(error.message);
    return transactions || [];
}

export async function insertTransaction(memberId: string, type: TransactionType, amount: number) {
    
    const { data, error } = 
        await supabase
            .from('transactions')
            .insert([
                {
                    "transaction_member_id": memberId,
                    "transaction_type":  type,
                    "transaction_amount": amount
                },
            ])
            .select();
    if (error) throw Error(error.message);

    return data;
        
}

export function toRupees(paise: number) {
    return paise / 100
}

export function toPaise(rupees: number) {
    return rupees * 100;
}