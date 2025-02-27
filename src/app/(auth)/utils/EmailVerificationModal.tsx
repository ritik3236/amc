'use client';

import React from 'react';
import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { zodResolver } from '@hookform/resolvers/zod';
import NextLink from 'next/link';

import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { z } from 'zod';

import { resendEmailToken } from '@/actions';

interface OwnProps {
    email: string,
    isOpen: boolean,
    onClose: () => void
}

export const EmailVerificationModal: React.FC<OwnProps> = (props) => {
    const { isOpen, email, onClose } = props;

    const { handleSubmit, control, setValue } = useForm({
        resolver: zodResolver(z.object({
            email: z.string().min(1, 'Email is required').email('Invalid email'),
        })),
        defaultValues: {
            email: email,
        },
    });

    React.useEffect(() => {
        setValue('email', email);
    }, [email, setValue]);

    const onSubmit = async (values: { email: string }) => {
        const { error, success } = await resendEmailToken(values);

        if (success) {
            toast.success('Verification link sent successfully, please check your email');
        } else {
            toast.error(error || 'Something went wrong');
        }
    };

    const modalBody = () => {
        if (!email) {
            return (
                <React.Fragment>
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
                                placeholder="deo@example.com"
                                value={field.value}
                                onChange={field.onChange}
                            />
                        )}
                    />
                    <div className="mt-6 pb-2">
                        A verification link will be sent to the email address you provided.
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <span>We have sent a verification link to your email address </span>
                <span className="font-bold text-primary">{email}.&nbsp;</span>
            </React.Fragment>
        );

    };

    return (
        <Modal backdrop="blur" isDismissable={false} isOpen={isOpen} onClose={onClose}>
            <ModalContent>
                <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                    <ModalHeader className="flex flex-col gap-1">Activate your account</ModalHeader>
                    <ModalBody>
                        <div className="text-sm">
                            {modalBody()}
                            Please click on that link to verify your email address. If you have not received the email
                            after a few minutes, please check your spam folder or request a new one.
                        </div>
                    </ModalBody>
                    <ModalFooter className="mt-4 gap-4 border-t">
                        <Button as={NextLink} href="/login" variant="flat" onPress={onClose}>
                            Already verified
                        </Button>
                        <Button color="primary" type="submit">Resend Email</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
};
