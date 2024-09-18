
import { getProfile } from '@/actions/dashboard/profile';
import { Breadcrumbs } from '@/components/ui/Breadcrumb';

export default async function ProfilePage() {

    const profile = await getProfile();

    return (
        <div>
            <Breadcrumbs/>
            {JSON.stringify(profile)}
        </div>
    );
}
