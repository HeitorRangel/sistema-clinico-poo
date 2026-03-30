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

        // RN2: O sistema deve autenticar a senha respeitando o polimorfismo da Entidade base.
        const hashCorreto = usuario.autenticar(senhaLimpa);
        if (!hashCorreto) {
            throw new Error('Credenciais inválidas.');
        }

        // Simula um JWT
        const tokenFake = `fake-jwt-token-for-${usuario.cpf}`;
        return { usuario, token: tokenFake };
    }
}

export class ValidarCadastroUseCase {
    constructor(private pacienteRepository: IPacienteRepository) {}

    public executar(usuarioLogado: Usuario, cpfCandidato: string): boolean {
        // Regra de Negócio: Apenas a secretária tem a capacidade de validar o cadastro inicial.
        if (!(usuarioLogado instanceof Secretaria)) {
            throw new Error('Acesso negado: Apenas secretárias podem validar cadastros.');
        }

        const paciente = this.pacienteRepository.buscarPorCpf(cpfCandidato);
        if (!paciente) {
            throw new Error('Cadastro de paciente não encontrado para validação.');
        }

        // O método validarCadastro pertence à entidade Secretaria, processando lógicas e burocracias internas.
        const estaValidado = usuarioLogado.validarCadastro(paciente.cpf);
        
        // Se a validação dependesse de mudar algo no Paciente, salvaríamos aqui:
        // this.pacienteRepository.salvar(paciente);

        return estaValidado;
    }
}
