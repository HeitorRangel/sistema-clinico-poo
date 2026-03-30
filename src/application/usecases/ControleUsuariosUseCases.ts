import { IUsuarioRepository, IPacienteRepository } from '../../domain/repositories/interfaces';
import { Usuario } from '../../domain/entities/Usuario';
import { Secretaria } from '../../domain/entities/Secretaria';
import { Paciente } from '../../domain/entities/Paciente';

export class AutenticarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) {}

    public executar(cpf: string, senhaLimpa: string): { usuario: Usuario, token: string } {
        const usuario = this.usuarioRepository.buscarPorCpf(cpf);
        if (!usuario) {
            throw new Error('Usuário não encontrado.');
        }

        // Delegação polimórfica da validação de senha
        const hashCorreto = usuario.autenticar(senhaLimpa);
        if (!hashCorreto) {
            throw new Error('Credenciais inválidas.');
        }

        // Geração de token JWT simulado
        const tokenFake = `fake-jwt-token-for-${usuario.cpf}`;
        return { usuario, token: tokenFake };
    }
}

export class ValidarCadastroUseCase {
    constructor(private pacienteRepository: IPacienteRepository) {}

    public executar(usuarioLogado: Usuario, cpfCandidato: string): boolean {
        // Validação de acesso (Somente Secretárias)
        if (!(usuarioLogado instanceof Secretaria)) {
            throw new Error('Acesso negado: Apenas secretárias podem validar cadastros.');
        }

        const paciente = this.pacienteRepository.buscarPorCpf(cpfCandidato);
        if (!paciente) {
            throw new Error('Cadastro de paciente não encontrado para validação.');
        }

        // Processamento de validação burocrática
        const estaValidado = usuarioLogado.validarCadastro(paciente.cpf);
        
        // Em um repositório real, o estado do paciente seria atualizado aqui
        // this.pacienteRepository.salvar(paciente);

        return estaValidado;
    }
}
