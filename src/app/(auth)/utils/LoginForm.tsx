'use client';

import React, { Suspense } from 'react';
import { Button } from '@heroui/button';
import { Checkbox } from '@heroui/checkbox';
import { Input } from '@heroui/input';
import { useDisclosure } from '@heroui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { doLogin } from '@/actions';
import { EmailVerificationModal } from '@/app/(auth)/utils/EmailVerificationModal';
import { ForgetPasswordModal } from '@/app/(auth)/utils/ForgetPasswordModal';
import { TwoFactorAuthModal } from '@/app/(auth)/utils/TwoFactorAuthModal';
import { ERROR_CODE_ACCOUNT_VERIFICATION_PENDING, ERROR_CODE_OTP_REQUIRED } from '@/lib/errors';
import { InputPassword } from '@/lib/passwordInput';
import { SignInSchema, signInSchema } from '@/lib/zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const LoginForm: React.FC = () => {
    const {
        isOpen: isOtpModalOpen,
        onOpen: onOtpModalOpen,
        onClose: onOtpModalClose,
    } = useDisclosure();

    const {
        isOpen: isVerificationModalOpen,
        onOpen: onVerificationModalOpen,
        onClose: onVerificationModalClose,
    } = useDisclosure();

    const {
        isOpen: isForgetPasswordModalOpen,
        onOpen: onForgetPasswordModalOpen,
        onClose: onForgetPasswordModalClose,
    } = useDisclosure();

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_LOGIN_REDIRECT;

    const { handleSubmit, formState, control, watch, getValues, resetField } = useForm<SignInSchema>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            otp: '',
            remember: false,
        },
    });

    const onSubmit = async (values: SignInSchema) => {
        const { error } = await doLogin(values, callbackUrl) || {};

        if (!error) return;

        if (error.code === ERROR_CODE_OTP_REQUIRED) {
            onOtpModalOpen();
        } else if (error.code === ERROR_CODE_ACCOUNT_VERIFICATION_PENDING) {
            onVerificationModalOpen();
        } else {
            toast.error(error?.message);
        }
    };

    const handelOtpModalClose = () => {
        resetField('otp');
        onOtpModalClose();
    };

    return (
        <React.Fragment>
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
                            autoComplete="current-password"
                            errorMessage={formState.errors?.['password']?.message?.toString()}
                            isInvalid={!!formState.errors?.['password']?.message}
                            label="Password"
                            labelPlacement="outside"
                            placeholder=" "
                            value={field.value}
                            onChange={field.onChange}
                        />
                    )}
                />
                <div className="flex items-center justify-between">
                    <Controller
                        control={control}
                        name="remember"
                        render={({ field }) => (
                            <Checkbox checked={field.value} onChange={field.onChange}>
                                <small>Remember me</small>
                            </Checkbox>
                        )}
                    />
                    <Button
                        color="primary"
                        size="sm"
                        variant="light"
                        onPress={onForgetPasswordModalOpen}
                    >
                        Forget Password?
                    </Button>
                </div>
                <Suspense>
                    <Button
                        color="primary"
                        disabled={formState.isSubmitting || isOtpModalOpen}
                        isLoading={!isOtpModalOpen && formState.isSubmitting}
                        type="submit"
                    >
                        Sign In
                    </Button>
                </Suspense>
            </form>
            <TwoFactorAuthModal
                control={control}
                isCtaDisabled={watch('otp').length !== 6}
                isCtaLoading={formState.isSubmitting}
                isOpen={isOtpModalOpen}
                onClose={handelOtpModalClose}
                onSubmit={() => handleSubmit(onSubmit)()}
            />
            <EmailVerificationModal
                email={getValues().email}
                isOpen={isVerificationModalOpen}
                onClose={onVerificationModalClose}
            />
            <ForgetPasswordModal
                email={getValues().email}
                isOpen={isForgetPasswordModalOpen}
                onClose={onForgetPasswordModalClose}
            />
        </React.Fragment>
    );
};
