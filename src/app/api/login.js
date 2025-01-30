import db from '../store/db';
import { serialize } from 'cookie';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    try {
      const [rows] = await db.query(
        'SELECT id FROM users WHERE email = ? AND password = ?',
        [email, password]
      );
      
      if (rows.length > 0) {
        const user = rows[0];
        res.setHeader('Set-Cookie', serialize('userId', String(user.id), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
          path: '/'
        }));
        return res.status(200).json({ message: 'Login successful', userId: user.id });
      }
      return res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  }
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
