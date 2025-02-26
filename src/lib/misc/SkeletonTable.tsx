import { Skeleton } from '@heroui/skeleton';

export const SkeletonTable = () => {
    return (
        <div className="flex w-full flex-col gap-1">
            <div className="grid h-10 grid-cols-6 items-center gap-2 rounded bg-default-100 contain-content">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index + 'skeleton-header'} className="col-span-1 h-10"/>
                ))}
            </div>
            {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index + 'skeleton-row'} className="h-8 w-full rounded"/>
            ))}
        </div>
    );
};
