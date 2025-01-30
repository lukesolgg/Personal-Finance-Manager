export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    description: string;
    category: string;
    type: 'income' | 'expense' | 'savings' | 'investment';
    transaction_date: string;
    created_at: string;
  }
  
  export interface Budget {
    id: number;
    user_id: number;
    category: string;
    amount: number;
    spent?: number; 
  }
  
  export interface Savings {
    id: number;
    user_id: number;
    name: string;
    target_amount?: number;
    current_amount: number;
  }
  
  export interface Investment {
    id: number;
    user_id: number;
    name: string;
    type: 'stock' | 'crypto' | 'real estate' | 'other';
    amount: number;
    purchase_date: string;
  }
  