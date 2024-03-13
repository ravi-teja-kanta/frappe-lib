import { toSupabaseDate } from "@/lib/date";
import supabase from "@/lib/supabase";
import { TransactionDTO, TransactionType } from "@/models/transaction";
import { addDays } from "date-fns";

export async function getAllTransactions(memberId: string): Promise<TransactionDTO[]> {
    
    const { data: transactions, error } = 
        await supabase
            .from('transactions')
            .select("*")
            .eq("transaction_member_id", memberId);

    if (error) throw Error(error.message);
    return transactions || [];
}

export async function insertTransaction(memberId: string, type: TransactionType, amount: number): Promise<TransactionDTO> {
    
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

    return data?.pop();
        
}


export async function getTransactionsByDate(date: Date): Promise<TransactionDTO[]> {
    
    const nextDay = addDays(date, 1);
    
    const { data: transactions, error } = 
        await supabase
            .from('transactions')
            .select("*")
            .lte('transaction_created_at', toSupabaseDate(nextDay))
            .gte('transaction_created_at', toSupabaseDate(date).slice(0, 10)) // this is needed done to set the start as date with 00:00 time.
            .eq('transaction_type', "MEMBER_PAID")
            .order("transaction_created_at", { ascending: false})

    if (error) throw Error(error.message);
    
    return transactions;
}

export async function getTodaysTransactionsWithMemberDetails() {
  
    const { data, error } = await supabase
        .from('todays_transactions_with_member_details') // Specify the name of your view here
        .select('*'); // You can select specific columns if needed

    if(error) throw Error(error.message);
    console.log(data)
    return data;
}