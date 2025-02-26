'use client';

import React, { Suspense } from 'react';
import { Button } from '@heroui/button';
import { Checkbox } from '@heroui/checkbox';
import { Input } from '@heroui/input';
import { useDisclosure } from '@heroui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { doRegister } from '@/actions';
import { EmailVerificationModal } from '@/app/(auth)/utils/EmailVerificationModal';
import { linkStyles } from '@/components/primitives';
import { ERROR_CODE_ACCOUNT_VERIFICATION_PENDING } from '@/lib/errors';
import { InputPassword } from '@/lib/passwordInput';
import { passwordRegexMessage, SignUpSchema, signUpSchema } from '@/lib/zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const SignUpForm: React.FC = () => {
    const searchParams = useSearchParams();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_LOGIN_REDIRECT;

    const { handleSubmit, formState, control, getValues } = useForm<SignUpSchema>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: '',
            password: '',
            confirm_password: '',
            terms: false,
        },
    });

    const onSubmit = async (values: SignUpSchema) => {
        const { error } = await doRegister(values, callbackUrl);

        if (!error) return;

        if (error && error.code === ERROR_CODE_ACCOUNT_VERIFICATION_PENDING) {
            onOpen();
        } else {
            toast.error(error?.message);
        }
    };

    const onModalClose = () => {
        onClose();
    };

    return (
        <>
            <form autoComplete="off" className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field, formState }) => (
                        <Input
                            autoComplete="off"
                            errorMessage={formState.errors?.['email']?.message?.toString()}
                            isInvalid={!!formState.errors?.['email']?.message}
                            label="Email"
                            labelPlacement="outside"
                            placeholder="doe@example.com"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field, formState }) => (
                        <InputPassword
                            autoComplete="new-password"
                            description={passwordRegexMessage}
                            errorMessage={formState.errors?.['password']?.message?.toString()}
                            isInvalid={!!formState.errors?.['password']?.message}
                            label="Password"
                            labelPlacement="outside"
                            placeholder="Strong Password"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="confirm_password"
                    render={({ field, formState }) => (
                        <InputPassword
                            autoComplete="new-password"
                            errorMessage={formState.errors?.['confirm_password']?.message?.toString()}
                            isInvalid={!!formState.errors?.['confirm_password']?.message}
                            label="Confirm Password"
                            labelPlacement="outside"
                            placeholder="Strong Password"
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="terms"
                    render={({ field }) => (
                        <div className="flex items-start">
                            <Checkbox
                                checked={field.value}
                                isInvalid={!!formState.errors?.['terms']?.message}
                                onChange={field.onChange}
                            />
                            <span className="flex flex-wrap items-center gap-1 text-sm">
                                I agree to the
                                <NextLink
                                    className={linkStyles().base({ type: 'underline' })}
                                    href="/terms"
                                >
                                    Terms of Service
                                </NextLink>
                                and
                                <NextLink
                                    className={linkStyles().base({ type: 'underline' })}
                                    href="/privacy"
                                >
                                    Privacy Policy
                                </NextLink>
                            </span>
                        </div>
                    )}
                />
                <Suspense>
                    <Button
                        color="primary"
                        disabled={formState.isSubmitting}
                        isLoading={formState.isSubmitting}
                        type="submit"
                    >
                        Sign Up
                    </Button>
                </Suspense>
            </form>
            <EmailVerificationModal email={getValues().email} isOpen={isOpen} onClose={onModalClose}/>
        </>
    );
};
