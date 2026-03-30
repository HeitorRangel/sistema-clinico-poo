import { IHorariosRepository } from '../../../domain/repositories/interfaces';
import { Horarios } from '../../../domain/entities/Horarios';

export class HorariosRepositoryInMemory implements IHorariosRepository {
    private horarios: Horarios[] = [];

    public buscarPorId(id: string): Horarios | null {
        return this.horarios.find(h => h.id === id) || null;
    }

    public buscarPorDentista(dentistaId: string): Horarios[] {
        return this.horarios.filter(h => h.dentistaId === dentistaId);
    }

    public buscarDisponiveis(dentistaId: string): Horarios[] {
        return this.horarios.filter(h => h.dentistaId === dentistaId && h.status === 'LIVRE');
    }

    public salvar(horario: Horarios): void {
        const index = this.horarios.findIndex(h => h.id === horario.id);
        if (index >= 0) {
            this.horarios[index] = horario;
        } else {
            this.horarios.push(horario);
        }
    }
}
