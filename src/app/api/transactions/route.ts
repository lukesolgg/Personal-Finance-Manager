import { NextRequest, NextResponse } from 'next/server';
import db from '../../store/db';

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  
  try {
    const [rows] = await db.query(
      `SELECT * FROM transactions WHERE user_id = ? ORDER BY transaction_date DESC`,
      [userId]
    );
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const { userId, ...transactionData } = await request.json();
  
  try {
    await db.query(
      `INSERT INTO transactions (user_id, amount, description, category, transaction_date, type)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        transactionData.amount,
        transactionData.description,
        transactionData.category,
        transactionData.date,
        transactionData.type
      ]
    );
    return NextResponse.json({ message: 'Transaction added' }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add transaction' },
      { status: 500 }
    );
  }
}
