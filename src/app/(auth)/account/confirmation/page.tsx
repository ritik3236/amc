'use client';

import React, { useEffect } from 'react';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { Progress } from '@heroui/progress';
import { useQuery } from '@tanstack/react-query';
import NextLink from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { toast } from 'sonner';

import { verifyEmailToken } from '@/actions';
import { EmailVerificationModal } from '@/app/(auth)/utils';
import { Icons } from '@/components/icons';
import { description, linkStyles } from '@/components/primitives';
import { sleep } from '@/lib/utils';

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const token = searchParams.get('confirmation_token');

    const {
        isOpen: isVerificationModalOpen,
        onOpen: onVerificationModalOpen,
        onClose: onVerificationModalClose,
    } = useDisclosure();

    const { data, isLoading } = useQuery({
        queryKey: ['email_verification', token],
        queryFn: () => verifyEmailToken({ token }),
        retry: false,
    });

    useEffect(() => {
        if (data?.success) {
            toast.success('Email verified successfully, Re-directing you to login page in few seconds...');
            sleep(1000).then(() => router.push('/login'));
        }

        if (data?.error) {
            toast.error(data.error);
        }
    }, [data, router]);

    return (
        <React.Fragment>
            {isLoading && <Progress
                isIndeterminate
                aria-label="Loading..."
                className="max-w-md"
                size="sm"
            />}
            {data?.success &&
                <div className="flex flex-col items-center justify-center">
                    <p className={description()}>
                        Your email has been verified. You can now close this page.
                    </p>
                    <NextLink className={linkStyles().base({ type: 'underline' })} href="/login">
                        login
                    </NextLink>
                </div>
            }
            {data?.error &&
                <div className="flex flex-col items-center justify-center gap-4">
                    <p className={description({ className: 'text-center' })}>
                        <span className="text-danger">Verification failed,</span>
                        &nbsp; verification link has expired or is invalid.<br/>
                        Please request a new link to verify your email address.
                    </p>
                    <Button
                        color="primary"
                        variant="flat"
                        onPress={onVerificationModalOpen}
                    >
                        Resend verification email
                    </Button>
                    <NextLink className={linkStyles().base({ type: 'underline' })} href="/login">
                        login <Icons.arrowRight className={linkStyles().icon()}/>
                    </NextLink>
                </div>
            }
            <EmailVerificationModal
                email=""
                isOpen={isVerificationModalOpen}
                onClose={onVerificationModalClose}
            />
        </React.Fragment>
    );
}
