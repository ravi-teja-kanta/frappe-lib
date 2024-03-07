"use server"

import { BookDTO } from "@/models/book";

type FrappeRequest = {
    title: string,
    pageNumber: number
}

export async function getFrappeLibBooks(req: FrappeRequest): Promise<[]> {
    const {title, pageNumber} = req;
    const baseFrappeUrl = "https://frappe.io/api/method/frappe-library";

    const res = await fetch(`${baseFrappeUrl}?title=${title}&page=${pageNumber}`);

    return (await res.json())["message"];

}