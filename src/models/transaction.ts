export type TransactionDTO = {
    id: string,
    transaction_member_id: string,
    transaction_amount: number // in paise
    transaction_type: TransactionType
}

export type TransactionType = "SYSTEM_LENT" | "MEMBER_PAID"