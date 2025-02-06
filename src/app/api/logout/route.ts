import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  // Clear the userId cookie
  (await
        // Clear the userId cookie
        cookies()).delete('userId');
  
  return NextResponse.json({ message: 'Logged out successfully' });
}