import React from 'react';
import Layout from '../components/Layout';

const Login: React.FC = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form className="space-y-4">
          <input type="text" placeholder="Username" className="w-full p-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 border rounded" />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;