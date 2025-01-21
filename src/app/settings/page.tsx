import dynamic from 'next/dynamic';

const ProfileSettings = dynamic(() => import('../components/ProfileSettings'));

export default function SettingsPage() {
  return <ProfileSettings />;
}