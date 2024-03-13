export function toSupabaseDate(date: Date) {
    return new Date(date).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
}