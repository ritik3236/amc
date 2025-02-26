'use server';

import { revalidatePath } from 'next/cache';

import { sleep } from '@/lib/utils';

export async function revalidateAllPaths(): Promise<void> {
    revalidatePath('/dashboard', 'layout');
    await sleep(1000);
}
