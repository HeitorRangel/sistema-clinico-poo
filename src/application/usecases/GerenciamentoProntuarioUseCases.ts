import { IProntuarioRepository, IConsultaRepository } from '../../domain/repositories/interfaces';
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

        // Validação de vínculo clínico prévio (RN11)
        const atendeuEstePaciente = this.consultaRepo.buscarPorDentistaEPaciente(
            dentistaLogado.cpf, prontuario.pacienteId
        );

        if (atendeuEstePaciente.length === 0) {
            throw new Error('Permissão Negada: Este dentista não possui liberação clínica sobre este paciente.');
        }

        // Mutação de Prontuário
        prontuario.adicionarExame(exameDescricao);
        this.prontuarioRepo.salvar(prontuario);
    }
}
