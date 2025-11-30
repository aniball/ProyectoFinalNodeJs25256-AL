import { generateToken } from "../data/token-generator.js";

const default_user = {
    id: 1,
    email: "test@gmail.com",
    password: "123456"
}

export const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    if (email === default_user.email && password === default_user.password) {
        const user = { id: default_user.id, email: default_user.email };
        const token = generateToken(user);
        res.status(200).json({ token }); 
    } else {
        res.status(401).json({ message: 'Credenciales inválidas. Acceso denegado.' });
    }
}