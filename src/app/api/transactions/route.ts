import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import mysql, { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

interface Transaction extends RowDataPacket {
  id: number;
  userId: number;
  type: 'income' | 'expense';
  amount: number;
  title: string;
  category: string;
  date: string;
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function GET(request: Request) {
  const userId = (await cookies()).get('userId')?.value;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const connection = await pool.getConnection();
    
    try {
      const [rows] = await connection.execute<Transaction[]>(
        'SELECT * FROM transactions WHERE userId = ? ORDER BY date DESC',
        [userId]
      );
      
      return NextResponse.json(rows);
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' }, 
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const userId = (await cookies()).get('userId')?.value;
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    const connection = await pool.getConnection();
    
    try {
      const [result] = await connection.execute<ResultSetHeader>(
        'INSERT INTO transactions (userId, type, amount, title, category, date) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, data.type, data.amount, data.title, data.category, data.date]
      );
      
      return NextResponse.json({
        id: result.insertId,
        userId,
        ...data
      });
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json(
      { error: 'Failed to add transaction' }, 
      { status: 500 }
    );
  }
}