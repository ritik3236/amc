import React from 'react';

import { Progress } from '@heroui/progress';

import { description, subtitle } from '@/components/primitives';
import { ErrorLogout } from '@/lib/misc/ErrorLogout';

interface DataPageTemplateProps {
    error: string | null;
    loading?: boolean;
    disableAutoLogout?: boolean;
    children?: React.ReactNode;
}

export const AsyncContainer: React.FC<DataPageTemplateProps> = (props) => {
    const { error, disableAutoLogout, loading, children } = props;

    if (loading) {
        return (
            <section className="flex flex-1 items-center justify-center py-4">
                <div className="w-40">
                    <Progress aria-labelledby="Loading..." color="primary" isIndeterminate={true} size="sm"/>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="flex flex-1 items-center justify-center py-4">
                <div className="m-auto">
                    {!disableAutoLogout && <ErrorLogout error={error}/>}
                    <h2 className={subtitle({ className: 'relative text-danger pl-1' })}>
                        <span>Error</span>
                        <span className="absolute left-0 top-1 h-4/6 w-0.5 bg-danger"/>
                    </h2>
                    <p className={description({ className: 'm-0', size: 'xs' })}>
                        {error}
                    </p>
                </div>
            </section>
        );
    }

    return <>{children}</>;
};
