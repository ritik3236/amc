import {z} from 'zod';

export const signInSchema = z.object({
    email: z.string({required_error: 'Email is required'})
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: z.string({required_error: 'Password is required'})
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    remember: z.union([z.boolean(), z.string()]).transform((val) => {
        if (typeof val === 'string') {
            return val === 'true';
        }

        return val;
    }),
});