'use client';

import { Suspense, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import { Checkbox } from '@nextui-org/checkbox';
import { Input } from '@nextui-org/input';
import { EyeFilledIcon, EyeSlashFilledIcon } from '@nextui-org/shared-icons';
import NextLink from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';

import { z } from 'zod';

import { doLogin } from '@/actions/auth';
import { link } from '@/components/primitives';

import { signInSchema } from '@/lib/zod';
import { DEFAULT_LOGIN_REDIRECT } from '@/routes';

export const LoginForm = () => {
    const [isVisible, setIsVisible] = useState(false);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || DEFAULT_LOGIN_REDIRECT;

    const toggleVisibility = () => setIsVisible(!isVisible);

    const { handleSubmit, formState, control } = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
            remember: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof signInSchema>) => {
        await doLogin(values, callbackUrl);
    };

    return (
        <form autoComplete="off" className="flex flex-col gap-6" method="POST" onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="email"
                render={({ field, formState }) => (
                    <Input
                        autoComplete="off"
                        errorMessage={formState.errors?.['email']?.message?.toString()}
                        isInvalid={!!formState.errors['email']?.message}
                        label="Email"
                        labelPlacement="outside"
                        placeholder="Jhon@doe.com"
                        value={field.value}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                control={control}
                name="password"
                render={({ field, formState }) => (
                    <Input
                        autoComplete="off"
                        endContent={
                            <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                                {isVisible ? (
                                    <EyeSlashFilledIcon
                                        className="pointer-events-none text-2xl text-default-400"/>
                                ) : (
                                    <EyeFilledIcon className="pointer-events-none text-2xl text-default-400"/>
                                )}
                            </button>
                        }
                        errorMessage={formState.errors?.['password']?.message?.toString()}
                        isInvalid={!!formState.errors['password']?.message}
                        label="Password"
                        labelPlacement="outside"
                        placeholder=" "
                        type={isVisible ? 'text' : 'password'}
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
                            Remember me
                        </Checkbox>
                    )}
                />
                <NextLink className={link().base({ size: 'xs' })} href={'/'} prefetch={true}>
                    Forget Password?
                </NextLink>
            </div>
            <Suspense>
                <Button color="primary" isLoading={formState.isSubmitting} type="submit">Sign In</Button>
            </Suspense>
        </form>
    );
};
