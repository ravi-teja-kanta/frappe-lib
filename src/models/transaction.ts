
export type TransactionDTO = {
    id: string,
    transaction_member_id: string,
    transaction_amount: number, // in paise
    transaction_type: TransactionType,
    transaction_created_at: Date
}

export type TransactionType = "SYSTEM_LENT" | "MEMBER_PAID";

export function toRupees(paise: number) {
    return paise / 100
}

export function toPaise(rupees: number) {
    return rupees * 100;
}
