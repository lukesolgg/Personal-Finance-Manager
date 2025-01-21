import { NextRequest, NextResponse } from 'next/server';
import db from '../../store/db'; // Adjust path if necessary

export async function POST(request: NextRequest) {
  const { username, email, password } = await request.json();
  // In production, hash the password before storing
  const hashedPassword = password; // Use bcrypt or similar in real scenarios

  try {
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO users (username, email, password) VALUES (?, ?, ?)`, 
      [username, email, hashedPassword], 
      function(err) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    
    // Type guard to check if error is an instance of Error
    let errorMessage = 'An unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    
    return NextResponse.json({ message: 'Error registering user', error: errorMessage }, { status: 500 });
  }
}