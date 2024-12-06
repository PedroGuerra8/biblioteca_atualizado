// middleware/authMiddleware.js
import { verify } from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Espera-se que o token venha no header 'Authorization' no formato 'Bearer <token>'

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        req.userId = decoded.id;  // Passa o ID do usuário para a próxima rota
        next();  // Continuar com a execução da próxima função
    });
};

export default verifyToken;
