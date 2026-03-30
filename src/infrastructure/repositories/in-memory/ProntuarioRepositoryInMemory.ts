import { IProntuarioRepository } from '../../../domain/repositories/interfaces';
import { Prontuario } from '../../../domain/entities/Prontuario';

export class ProntuarioRepositoryInMemory implements IProntuarioRepository {
    private prontuarios: Prontuario[] = [];

    public buscarPorId(id: string): Prontuario | null {
        return this.prontuarios.find(p => p.id === id) || null;
    }

    public buscarPorPaciente(pacienteId: string): Prontuario | null {
        return this.prontuarios.find(p => p.pacienteId === pacienteId) || null;
    }

    // Garante Regra 1 Paciente -> 1 Prontuario
    public salvar(prontuario: Prontuario): void {
        const index = this.prontuarios.findIndex(p => p.pacienteId === prontuario.pacienteId);
        if (index >= 0) {
            this.prontuarios[index] = prontuario;
        } else {
            this.prontuarios.push(prontuario);
        }
    }
}
