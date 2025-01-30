import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';

// Log environment variables for debugging
console.log('Environment Variables:', {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  // Don't log the actual password
  hasPassword: !!process.env.MYSQL_PASSWORD
});

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306'),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export async function POST(request: Request) {
  let connection;
  try {
    const { email, password } = await request.json();
    
    // Get connection from pool
    connection = await pool.getConnection();
    console.log('Database connected successfully');

    // Debug log
    console.log('Attempting login for email:', email);

    const [rows]: any = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    console.log('Query results:', rows); // Debug log

    const user = rows[0];

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const cookie = serialize('userId', user.id.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: 'strict',
      path: '/'
    });

    return new NextResponse(
      JSON.stringify({
        email: user.email,
        id: user.id
      }), {
        status: 200,
        headers: { 'Set-Cookie': cookie }
      }
    );

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Database connection failed' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}