import { IProntuarioRepository, IConsultaRepository } from '../../domain/repositories/interfaces';
import { Prontuario } from '../../domain/entities/Prontuario';
import { Dentista } from '../../domain/entities/Dentista';

export class GerenciarProntuarioUseCase {
    constructor(
        private prontuarioRepo: IProntuarioRepository,
        private consultaRepo: IConsultaRepository
    ) {}

    public adicionarExame(dentistaLogado: Dentista, prontuarioId: string, exameDescricao: string): void {
        const prontuario = this.prontuarioRepo.buscarPorId(prontuarioId);
        
        if (!prontuario) {
            throw new Error('Prontuário inválido.');
        }

        // Regra Especial de Negócio: Dentista só atende pacientes da sua cartela
        const atendeuEstePaciente = this.consultaRepo.buscarPorDentistaEPaciente(
            dentistaLogado.cpf, prontuario.pacienteId
        );

        if (atendeuEstePaciente.length === 0) {
            throw new Error('Permissão Negada: Este dentista não possui liberação clínica sobre este paciente.');
        }

        // Processamento aprovado
        prontuario.adicionarExame(exameDescricao);
        this.prontuarioRepo.salvar(prontuario);
    }
}
