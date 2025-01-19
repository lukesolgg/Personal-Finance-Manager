import React from 'react';
import Layout from '../components/Layout';
import TransactionList from '../components/TransactionList';
import AddTransaction from '../components/AddTransaction';

const Transactions: React.FC = () => {
  return (
    <Layout>
      <AddTransaction />
      <TransactionList />
    </Layout>
  );
};

export default Transactions;