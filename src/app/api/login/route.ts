import { NextRequest, NextResponse } from 'next/server';
import db from '../../store/db';
import { serialize } from 'cookie';

interface User {
  id: number;
  // Add other user properties here if needed
}

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const user = await new Promise<User | undefined>((resolve, reject) => {
      db.get<User>(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (user) {
      const cookie = serialize('userId', user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 604800, // 1 week
        sameSite: 'strict',
        path: '/'
      });
      return new NextResponse(JSON.stringify({ message: 'Login successful', userId: user.id }), {
        status: 200,
        headers: { 'Set-Cookie': cookie }
      });
    } else {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ message: 'Error logging in', error: errorMessage }, { status: 500 });
  }
}