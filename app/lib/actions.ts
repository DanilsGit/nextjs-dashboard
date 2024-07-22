'use server'

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createInvoice(formData: FormData) {

    // const rawFormData = Object.fromEntries(formData.entries());

    try {
        const amountInCents = Number(formData.get('amount')) * 100;

        const rawFormData = {
            customer_id: formData.get('customerId'),
            amount: amountInCents,
            status: formData.get('status'),
            date: new Date().toISOString().split('T')[0]
        }

        const res = await fetch(`${process.env.API_URL}/invoices`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawFormData)
        });

        console.log(res.ok);


        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }

    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to create invoice.');
    }

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');

}