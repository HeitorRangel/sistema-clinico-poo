import { Usuario } from '../../domain/entities/Usuario';
import { Prontuario } from '../../domain/entities/Prontuario';
import { Secretaria } from '../../domain/entities/Secretaria';
import { Dentista } from '../../domain/entities/Dentista';
import { Paciente } from '../../domain/entities/Paciente';
import { IConsultaRepository, IProntuarioRepository } from '../../domain/repositories/interfaces';

export interface IProntuarioService {
    consultar(usuarioLogado: Usuario, prontuarioId: string): Prontuario;
    adicionarExame(usuarioLogado: Usuario, prontuarioId: string, exame: string): void;
}

export interface IUsuarioService {
    atualizarDadosPessoais(usuarioLogado: Usuario, dadosSalvos: Usuario, novosDados: Partial<Usuario>): void;
}

// Serviços Reais: Focados apenas na regra de manipulação dos registros (SRP)
export class ProntuarioService implements IProntuarioService {
    constructor(private prontuarioRepo: IProntuarioRepository) {}

    public consultar(usuarioLogado: Usuario, prontuarioId: string): Prontuario {
        const pront = this.prontuarioRepo.buscarPorId(prontuarioId);
        if (!pront) throw new Error('Prontuário inexistente.');
        return pront;
    }

    public adicionarExame(usuarioLogado: Usuario, prontuarioId: string, exame: string): void {
        const pront = this.consultar(usuarioLogado, prontuarioId);
        pront.adicionarExame(exame);
    }
}

export class UsuarioService implements IUsuarioService {
    public atualizarDadosPessoais(usuarioLogado: Usuario, dadosSalvos: Usuario, novosDados: Partial<Usuario>): void {
        if (novosDados.nome) dadosSalvos.nome = novosDados.nome;
        // Não é permitido alterar CPF
    }
}

// Proxy: Intercepta a chamada para aplicar as regras de autorização, protegendo o serviço real.
export class ProntuarioProxy implements IProntuarioService {
    constructor(
        private servicoReal: IProntuarioService,
        private consultaRepository: IConsultaRepository,
        private prontuarioRepository: IProntuarioRepository
    ) {}

    public consultar(usuarioLogado: Usuario, prontuarioId: string): Prontuario {
        this.verificarRegrasDeAcesso(usuarioLogado, prontuarioId);
        return this.servicoReal.consultar(usuarioLogado, prontuarioId);
    }

    public adicionarExame(usuarioLogado: Usuario, prontuarioId: string, exame: string): void {
        this.verificarRegrasDeAcesso(usuarioLogado, prontuarioId);
        this.servicoReal.adicionarExame(usuarioLogado, prontuarioId, exame);
    }

    private verificarRegrasDeAcesso(usuarioLogado: Usuario, prontuarioId: string): void {
        if (usuarioLogado instanceof Secretaria) return; 

        const prontuario = this.prontuarioRepository.buscarPorId(prontuarioId);
        if (!prontuario) throw new Error('Prontuário não encontrado.');

        if (usuarioLogado instanceof Dentista) {
            const consultas = this.consultaRepository.buscarPorDentistaEPaciente(
                usuarioLogado.cpf,  
                prontuario.pacienteId
            );

            if (consultas.length === 0) {
                throw new Error('Acesso negado: Dentista não possui consultas com este paciente.');
            }
            return;
        }

        if (usuarioLogado instanceof Paciente) {
            throw new Error('Acesso negado: Paciente não tem permissão para visualizar prontuários.');
        }
    }
}

// Proxy: Garante que os usuários comuns só editem seus próprios perfis.
export class UsuarioProxy implements IUsuarioService {
    constructor(private servicoReal: IUsuarioService) {}

    public atualizarDadosPessoais(usuarioLogado: Usuario, dadosSalvos: Usuario, novosDados: Partial<Usuario>): void {
        if (usuarioLogado instanceof Secretaria) {
            return this.servicoReal.atualizarDadosPessoais(usuarioLogado, dadosSalvos, novosDados);
        }

        if (usuarioLogado.cpf === dadosSalvos.cpf) {
            return this.servicoReal.atualizarDadosPessoais(usuarioLogado, dadosSalvos, novosDados);
        }

        throw new Error('Acesso negado: Tentativa de alterar informações de terceiros.');
    }
}


