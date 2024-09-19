import { redirect, RedirectType } from 'next/navigation';

export default function SettingsPage() {
    redirect  ('/', RedirectType.replace );
}
