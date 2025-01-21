// src/app/pages/transactions/page.tsx
import dynamic from 'next/dynamic';

const Transactions = dynamic(() => import('../..//components/Transactions'));
const ClientLayout = dynamic(() => import('../../components/ClientLayout'));

const TransactionsPage: React.FC = () => {
  return (
    <ClientLayout>
      <Transactions />
    </ClientLayout>
  );
};

export default TransactionsPage;