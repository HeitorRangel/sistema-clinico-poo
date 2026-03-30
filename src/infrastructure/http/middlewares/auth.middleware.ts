import { Request, Response, NextFunction } from 'express';
import { usuarioRepo } from '../di';

// Extendendo o Request do Express para comportar o usuarioLogado gerado pela arquitetura
declare global {
    namespace Express {
        interface Request {
            usuarioLogado?: any;
        }
    }
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
        res.status(401).json({ error: true, message: 'Autenticação necessária. Token ausente.' });
        return;
    }

    // Extração do sufixo para decode simulado de JWT
    const tokenParts = authHeader.split(' ');
    const tokenString = tokenParts[1] || authHeader;
    const tokenSufix = tokenString.split('fake-jwt-token-for-')[1];

    if (!tokenSufix) {
        res.status(401).json({ error: true, message: 'Token JWT inválido ou mal formatado no TDD.' });
        return;
    }

    // Identificação do Usuário Logado
    const usuarioReal = usuarioRepo.buscarPorCpf(tokenSufix);

    if (!usuarioReal) {
        res.status(401).json({ error: true, message: 'Usuário não encontrado via token.' });
        return;
    }

    req.usuarioLogado = usuarioReal;
    next();
}
