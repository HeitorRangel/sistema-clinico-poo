import { Request, Response, NextFunction } from 'express';

// Middleware Global de Tratamento de Erros
export function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void {
    console.error('[Error Handler] Problema capturado:', err.message);
    
    // Tratativa padrão de Error do TypeScript
    if (err instanceof Error) {
        res.status(400).json({ error: true, message: err.message });
        return;
    }

    res.status(500).json({ error: true, message: 'Falha interna inesperada no servidor.' });
}
