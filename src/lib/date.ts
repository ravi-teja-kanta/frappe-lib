export function toSupabaseDate(date: Date) {
    return new Date(date.valueOf() + date.getTimezoneOffset() * 60 * 1000).toISOString();
}