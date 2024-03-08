import { getAllActiveIssuesAndBookDetails, getMemberDetails, markBookAsAvailable, settleMemberDues } from "./memberManager";

export async function getMember(memberId: string) {
    return await getMemberDetails(memberId)
}

export async function getBooksToBeReturned(memberId: string) {
    return await getAllActiveIssuesAndBookDetails(memberId);
}

export async function returnBook(bookId: string, memberId: string) {
    try {
         await markBookAsAvailable(bookId, memberId);
        return {
            isBookReturned: true
        }
    } catch(e) {
        return {
            isBookReturned: false,
            reason: "Internal Issue"
        }
    }
}

export async function settleDues(memberId: string) {
    try {
        await settleMemberDues(memberId);
        return true;
    } catch(e) {
        console.error(JSON.stringify(e));
        return false;
    }
}
