import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

//'dotenv/config';
dotenv.config({ path: '../../.env' });
const secret_key = process.env.JWT_SECRET_KEY || "nBEcO6lxNOI9xKzt";

export const authentication = (req, res, next) => {

    const token = req.headers['authorization'].split(" ")[1];

    if (!token) return res.sendStatus(401);
    console.log(secret_key)
    jwt.verify(token, secret_key, (err) => {
        if (err) return res.status(403).json({ message: 'Token inválido o expirado' });
        next();
    });
}