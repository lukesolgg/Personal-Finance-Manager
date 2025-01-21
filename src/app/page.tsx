import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('./components/Dashboard'));

export default function Page() {
  return (
    <Dashboard />
  );
}