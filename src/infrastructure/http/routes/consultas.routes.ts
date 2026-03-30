import { Router, Request, Response } from 'express';
import { SolicitarConsultaUseCase, AprovarConsultaUseCase, CancelarConsultaUseCase } from '../../../application/usecases/GerenciamentoConsultasUseCases';
import { horariosRepo, consultaRepo, dentistaRepo } from '../di';
import { authMiddleware } from '../middlewares/auth.middleware';
import { Paciente } from '../../../domain/entities/Paciente';
import { Secretaria } from '../../../domain/entities/Secretaria';

export const consultasRouter = Router();

// Injeção de dependências dos Casos de Uso
const solicitarUC = new SolicitarConsultaUseCase(horariosRepo, consultaRepo);
const aprovarUC = new AprovarConsultaUseCase(consultaRepo);
const cancelarUC = new CancelarConsultaUseCase(consultaRepo, horariosRepo);

// Autenticação Global
consultasRouter.use(authMiddleware);

/**
 * @swagger
 * /consultas/solicitar:
 *   post:
 *     summary: Solicita uma nova consulta consumindo um Horário Livre
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               horario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Consulta solicitada com sucesso.
 */
consultasRouter.post('/solicitar', async (req: Request, res: Response) => {
    // Validação de Perfil
    if (!(req.usuarioLogado instanceof Paciente)) {
        res.status(403).json({ error: true, message: 'Apenas pacientes podem solicitar consultas.' });
        return;
    }

    const { tipo, horario } = req.body;

    // Dispara regra de negócio (pode emitir throw e ser pego pelo Error Middleware geral)
    // O SolicitarConsultaUseCase é async porque lida com Promise<Consulta>
    const consulta = await solicitarUC.executar(req.usuarioLogado, tipo, horario);

    // Mapeamento de DTO
    const dentistaVinculado = dentistaRepo.buscarPorCpf(consulta.dentistaId);

    res.json({
        success: true,
        mensagem: 'Consulta solicitada',
        consulta: {
            id: consulta.id,
            pacienteId: consulta.pacienteId,
            dentistaAprovado: dentistaVinculado ? dentistaVinculado.nome : 'Não Relacionado',
            horario: horario, // Mudando o nome pro Frontend conforme solicitado
            valorTabelado: (consulta as any).valor || (consulta as any).valorBase || 0,
            statusConsulta: (consulta as any).statusConsulta || 'SOLICITADA'
        }
    });
});

/**
 * @swagger
 * /consultas/{id}/aprovar:
 *   put:
 *     summary: Secretária aprova o agendamento de uma solicitação
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consulta aprovada e agendada formalmente.
 */
consultasRouter.put('/:id/aprovar', (req: Request, res: Response) => {
    if (!(req.usuarioLogado instanceof Secretaria)) {
        res.status(403).json({ error: true, message: 'Acesso restrito para Secretárias.' });
        return;
    }

    const consultaId = req.params.id as string;
    aprovarUC.executar(req.usuarioLogado, consultaId);

    res.json({ success: true, mensagem: 'Consulta aprovada com sucesso.', statusAtual: 'AGENDADA' });
});

/**
 * @swagger
 * /consultas/{id}/cancelar:
 *   put:
 *     summary: Paciente cancela sua consulta e sistema libera a agenda do médico
 *     tags: [Consultas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Agendamento cancelado com sucesso.
 */
consultasRouter.put('/:id/cancelar', (req: Request, res: Response) => {
    if (!(req.usuarioLogado instanceof Paciente)) {
        res.status(403).json({ error: true, message: 'Apenas o próprio Paciente pode cancelar.' });
        return;
    }

    const consultaId = req.params.id as string;
    cancelarUC.executar(req.usuarioLogado, consultaId);

    res.json({ success: true, mensagem: 'Consulta cancelada e horário devolvido.' });
});
