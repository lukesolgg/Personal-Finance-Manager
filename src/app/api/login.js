// pages/api/login.js
import db from '../store/db';
import { serialize } from 'cookie'; // npm install cookie

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;
    
    try {
      const user = await new Promise((resolve, reject) => {
        db.get(`SELECT * FROM users WHERE email = ? AND password = ?`, [email, password], (err, row) => {
          if (err) {
            reject(err);
          } else {
            resolve(row);
          }
        });
      });

      if (user) {
        // In a real app, you'd set a session or token here, not just a simple cookie
        res.setHeader('Set-Cookie', serialize('userId', String(user.id), {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/'
        }));
        res.status(200).json({ message: 'Login successful', userId: user.id });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}