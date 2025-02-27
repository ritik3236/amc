'use client';

import React, { Suspense } from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { zodResolver } from '@hookform/resolvers/zod';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { z } from 'zod';

import { generateForgetPasswordToken } from '@/actions';
import { description } from '@/components/primitives';

interface OwnProps {
    email: string,
    isOpen: boolean,
    onClose: () => void
}

export const ForgetPasswordModal: React.FC<OwnProps> = (props) => {
    const { isOpen, email: initialEmail, onClose } = props;

    const { handleSubmit, formState, control, setValue } = useForm({
        resolver: zodResolver(z.object({
            email: z.string().min(1, 'Email is required').email('Invalid email'),
        })),
        defaultValues: {
            email: '',
        },
    });

    React.useEffect(() => {
        setValue('email', initialEmail);
    }, [initialEmail, setValue]);

    const onSubmit = async (values: { email: string }) => {
        const { success, error } = await generateForgetPasswordToken(values);

        if (success) {
            toast.success('Password reset link sent successfully, please check your email');
            onClose();
        } else {
            toast.error(error || 'Something went wrong');
        }
    };

    return (
        <Modal backdrop="blur" isDismissable={false} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader className="flex flex-col gap-1">
                        <h3>
                            Forgot Your Password?
                        </h3>
                        <p className={description({ className: 'font-normal p-0', size: 'xs' })}>
                            No worries! Just enter your email, and we&#39;ll send you a link to reset your password.
                            Follow the steps in the email to get back into your account.
                        </p>
                    </ModalHeader>
                    <ModalBody>
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
                    </ModalBody>
                    <ModalFooter className="mt-4 border-t">
                        <Suspense>
                            <Button
                                color="primary"
                                disabled={formState.isSubmitting}
                                isLoading={formState.isSubmitting}
                                type="submit"
                            >
                                Send Reset Link
                            </Button>
                        </Suspense>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
