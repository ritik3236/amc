'use client';

import React, { Suspense } from 'react';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { toast } from 'sonner';

import { verifyForgetPasswordToken } from '@/actions';
import { ForgetPasswordModal } from '@/app/(auth)/utils/ForgetPasswordModal';
import { InputPassword } from '@/lib/passwordInput';
import { sleep } from '@/lib/utils';
import { ForgotPasswordSchema, forgotPasswordSchema } from '@/lib/zod';

export const ResetPasswordForm: React.FC = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const resetToken = searchParams.get('reset_token');

    const {
        isOpen: isForgetPasswordModalOpen,
        onOpen: onForgetPasswordModalOpen,
        onClose: onForgetPasswordModalClose,
    } = useDisclosure();

    const { handleSubmit, formState, control } = useForm<ForgotPasswordSchema>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            reset_token: resetToken || '',
            new_password: '',
            confirm_password: '',
        },
    });

    const onSubmit = async (values: ForgotPasswordSchema) => {
        const { success, error } = await verifyForgetPasswordToken(values);

        if (success) {
            toast.success('Password updated successfully, Re-directing you to login page in few seconds...');
            await sleep(1000);
            router.push('/login');
        } else {
            toast.error(error);
        }
    };

    return (
        <React.Fragment>
            <form autoComplete="off" className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    name="new_password"
                    render={({ field, formState }) => (
                        <InputPassword
                            autoComplete="new-password"
                            errorMessage={formState.errors?.['new_password']?.message?.toString()}
                            isInvalid={!!formState.errors?.['new_password']?.message}
                            label="New Password"
                            labelPlacement="outside"
                            placeholder=" "
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
                            label="Re-Enter Password"
                            labelPlacement="outside"
                            placeholder=" "
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <Suspense>
                    <Button
                        color="primary"
                        isDisabled={formState.isSubmitting}
                        isLoading={formState.isSubmitting}
                        type="submit"
                    >
                        Reset Password
                    </Button>
                </Suspense>
            </form>
            <div className="mt-4 flex justify-center">
                <Button
                    color="primary"
                    size="sm"
                    variant="light"
                    onPress={onForgetPasswordModalOpen}
                >
                    Token expired? Resend reset link
                </Button>
            </div>
            <ForgetPasswordModal
                email=""
                isOpen={isForgetPasswordModalOpen}
                onClose={onForgetPasswordModalClose}
            />
        </React.Fragment>
    );
};
