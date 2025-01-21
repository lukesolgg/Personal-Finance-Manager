// src/app/page.tsx
import dynamic from 'next/dynamic';

const Dashboard = dynamic(() => import('../components/Dashboard'));

const Home: React.FC = () => {
  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;