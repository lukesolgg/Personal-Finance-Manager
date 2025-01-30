import db from '../store/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, email, password } = req.body;
    
    try {
      const [result] = await db.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, password]
      );

      if (result.affectedRows === 1) {
        return res.status(201).json({ message: 'User registered successfully' });
      }
      return res.status(400).json({ message: 'Registration failed' });
    } catch (error) {
      console.error('Registration error:', error);
      return res.status(500).json({ 
        message: 'Error registering user',
        error: error.message
      });
    }
  }
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
