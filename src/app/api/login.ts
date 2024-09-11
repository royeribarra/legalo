// pages/api/login.ts
import type { NextApiRequest, NextApiResponse } from 'next';

interface User {
  username: string;
  password: string;
}

// Un ejemplo simple de usuarios
const users: { [key: string]: string } = {
  'user1': 'password1',
  'user2': 'password2',
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password }: User = req.body;

    // Validar el usuario
    if (users[username] && users[username] === password) {
      // Autenticación exitosa
      res.status(200).json({ message: 'Login successful' });
    } else {
      // Autenticación fallida
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } else {
    // Método no permitido
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
