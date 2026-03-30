import { Router, Request, Response } from 'express';
import { AutenticarUsuarioUseCase } from '../../../application/usecases/ControleUsuariosUseCases';
import { usuarioRepo } from '../di';

export const authRouter = Router();
const autenticarUC = new AutenticarUsuarioUseCase(usuarioRepo);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autentica um usuário na Clínica e devolve o Token Segregado
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cpf:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario logado com sucesso.
 *       400:
 *         description: Credenciais incorretas.
 */
authRouter.post('/login', (req: Request, res: Response) => {
    const { cpf, senha } = req.body;
    
    // Execução do Use Case de Autenticação
    const resultado = autenticarUC.executar(cpf, senha);
    
    // Geração de token JWT simulado
    res.json({ success: true, token: resultado.token, classType: resultado.usuario.constructor.name });
});
