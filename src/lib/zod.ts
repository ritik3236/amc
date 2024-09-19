import { z } from 'zod';

export const signInSchema = z.object({
    email: z.string({ required_error: 'Email is required' })
        .min(1, 'Email is required')
        .email('Invalid email'),
    password: z.string({ required_error: 'Password is required' })
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    otp: z.string()
        .min(0)
        .max(6, 'OTP must be 6 characters')
        .optional(),
    remember: z.union([z.boolean(), z.string()]).optional().transform((val) => {
        if (typeof val === 'string') {
            return val === 'true';
        }

        return val;
    }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const LabelSchema = z.object({
    'key': z.string(),
    'value': z.string(),
    'scope': z.string(),
});
export type Label = z.infer<typeof LabelSchema>;

export const PhoneSchema = z.object({
    id: z.number(),
    country: z.string(),
    number: z.string(),
    validated_at: z.date().nullable(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
});
export type Phone = z.infer<typeof PhoneSchema>;
export const ProfileSchema = z.object({
    'id': z.number(),
    'first_name': z.string(),
    'last_name': z.string(),
    'full_name': z.string(),
    'dob': z.string(),
    'address': z.string(),
    'postcode': z.string(),
    'city': z.string(),
    'country': z.string(),
    'state': z.string(),
    'created_at': z.coerce.date(),
    'updated_at': z.coerce.date(),
});
export type Profile = z.infer<typeof ProfileSchema>;

export const UserSchema = z.object({
    'email': z.string(),
    'uid': z.string(),
    'role': z.string(),
    'level': z.number(),
    'otp': z.boolean(),
    'state': z.string(),
    'referral_uid': z.null(),
    'data': z.string(),
    'username': z.null(),
    'labels': z.array(LabelSchema),
    'phones': z.array(PhoneSchema),
    'profiles': z.array(ProfileSchema),
    'data_storages': z.array(z.any()),
    'created_at': z.coerce.date(),
    'updated_at': z.coerce.date(),
});
export type User = z.infer<typeof UserSchema>;
