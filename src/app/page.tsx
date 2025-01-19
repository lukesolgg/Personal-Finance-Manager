'use client'; // Assuming this page might need client-side hooks

import React from 'react';
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const Page = () => {
  return (
    <Layout>
      <div className="flex flex-col h-screen bg-gray-100">
        <div className="flex flex-1">
          <Navbar />
          <main className="flex-1 overflow-y-auto">
            <Dashboard />
          </main>
        </div>
        <Footer />
      </div>
    </Layout>
  );
};

export default Page;