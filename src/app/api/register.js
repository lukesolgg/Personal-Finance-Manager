import db from '../store/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { username, email, password } = req.body;
  
  // In a real application, you would hash the password
  const hashedPassword = password; // Placeholder - use bcrypt or similar
  
  try {
    const result = await new Promise((resolve, reject) => {
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
    
    res.status(201).json({ message: 'User registered successfully', userId: result });
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
}