import { Request, Response, NextFunction } from 'express';

// Middleware Global de Tratamento de Erros
export function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    _next: NextFunction
): void {
    if (err instanceof Error) {
        console.error('[Error Handler] Problema capturado:', err.message);
        res.status(400).json({ error: true, message: err.message });
        return;
    }

    res.status(500).json({ error: true, message: 'Falha interna inesperada no servidor.' });
}
