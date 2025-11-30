import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//dotenv.config();
dotenv.config({ path: '../../.env' });
const secret_key = process.env.JWT_SECRET_KEY || "nBEcO6lxNOI9xKzt";
//console.log(secret_key)

export const generateToken = (userData) => {
  const user = {id: userData.id, email: userData.email};
  const expiration = { expiresIn: '1h' };
  return jwt.sign(user, secret_key, expiration);
}

const token = generateToken({id: "1", email: "test@gmail.com"})
//console.log(token)