import { Router, Request, Response } from 'express';
import { GerenciarProntuarioUseCase } from '../../../application/usecases/GerenciamentoProntuarioUseCases';
import { prontuarioRepo, consultaRepo } from '../di';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Dentista } from '../../../domain/entities/Dentista';

export const prontuariosRouter = Router();

const prontuarioUC = new GerenciarProntuarioUseCase(prontuarioRepo, consultaRepo);

prontuariosRouter.use(authMiddleware);

/**
 * @swagger
 * /prontuarios/{id}/exames:
 *   post:
 *     summary: Dentista adiciona um exame ao histórico imutável (Se já o atendeu antes)
 *     tags: [Prontuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descricao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Exame adicionado ao histórico clínico.
 */
prontuariosRouter.post('/:id/exames', (req: Request, res: Response) => {
    // Validação de acesso (RBAC)
    if (!(req.usuarioLogado instanceof Dentista)) {
        res.status(403).json({ error: true, message: 'Somente Dentistas habilitados podem adicionar exames no Prontuário.' });
        return;
    }

    const prontuarioId = req.params.id as string;
    const { descricao } = req.body;

    // Avaliação de Regra de Negócio restrita a vínculo prévio (RN11)
    prontuarioUC.adicionarExame(req.usuarioLogado, prontuarioId, descricao);
    
    res.json({ success: true, mensagem: 'Exame gravado com sucesso no registro in-memory.' });
});
