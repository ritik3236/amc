import { Divider } from '@nextui-org/divider';
import { Snippet } from '@nextui-org/snippet';

import { getProfile } from '@/actions/dashboard/settings';
import { description, subtitle } from '@/components/primitives';

export default async function GeneralPage() {
    const user = await getProfile();

    if (user.success === false) {
        return (
            <section className="m-auto">
                <h2 className={subtitle()}>Error</h2>
                <p className={description({ className: 'm-0', size: 'xs' })}>
                    {'An error occurred while fetching your profile information. Please try again later.'}
                </p>
            </section>
        );
    }

    return (
        <section className="space-y-8 py-4">
            <div className="mt-4 grid grid-cols-3">
                <div className="col-span-1">
                    <h2 className={subtitle()}>Personal Information</h2>
                    <p className={description({ className: 'm-0', size: 'xs' })}>
                        Manage your personal information.
                    </p>
                </div>
                <div className="col-span-2 grid grid-cols-2 gap-x-8 gap-y-4 text-sm font-medium">
                    <div className="flex flex-col gap-2">
                        <p>User Id</p>
                        <Snippet hideSymbol classNames={{ pre: 'font-sans' }} radius="lg" size="md">
                            {user.value.uid}
                        </Snippet>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>User Name</p>
                        <Snippet hideSymbol classNames={{ pre: 'font-sans' }} radius="lg" size="md">
                            {user.value.username || 'N/A'}
                        </Snippet>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Email</p>
                        <Snippet hideSymbol classNames={{ pre: 'font-sans' }} radius="lg" size="md">
                            {user.value.email}
                        </Snippet>
                    </div>
                    <div className="flex flex-col gap-2">
                        <p>Full Name</p>
                        <Snippet hideSymbol classNames={{ pre: 'font-sans' }} radius="lg" size="md">
                            {user.value.profiles[0]?.full_name || 'N/A'}
                        </Snippet>
                    </div>
                </div>
            </div>
            <Divider/>
            <div className="grid grid-cols-3">
                <div className="col-span-1">
                    <h2 className={subtitle()}>Referral link</h2>
                    <p className={description({ className: 'm-0', size: 'xs' })}>
                        Refer & earn rewards and discounts.
                    </p>
                </div>
                <div className="col-span-2 grid grid-cols-1 gap-x-8 gap-y-4 text-sm font-medium">
                    <div className="flex flex-col gap-2">
                        <p>Referral Link</p>
                        <Snippet hideSymbol classNames={{ pre: 'font-sans' }} radius="lg"
                            size="md">
                            {`${process.env.NEXT_PUBLIC_BASE_URL}/signup?refid=${user.value.uid}`}
                        </Snippet>
                    </div>
                </div>
            </div>
        </section>
    );
}
