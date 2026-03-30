import { IConsultaRepository, IPagamentoRepository } from '../../../domain/repositories/interfaces';
import { Consulta } from '../../../domain/entities/Consulta';
import { Pagamento } from '../../../domain/entities/Pagamento';

export class ConsultaRepositoryInMemory implements IConsultaRepository {
    private consultas: Consulta[] = [];

    public buscarPorDentistaEPaciente(dentistaId: string, pacienteId: string): Consulta[] {
        return this.consultas.filter(c => c.dentistaId === dentistaId && c.pacienteId === pacienteId);
    }

    public buscarPorPaciente(cpf: string): Consulta[] {
        return this.consultas.filter(c => c.pacienteId === cpf); // Utilizando CPF como id por simplicidade relacional anterior
    }

    public listar(): Consulta[] {
        return this.consultas;
    }

    public salvar(consulta: Consulta): void {
        // Regra: 1 Consulta -> 1 Horario. Garantimos update se horarioId bater ou inserimos novo
        const index = this.consultas.findIndex(c => c.id === consulta.id);
        if (index >= 0) {
            this.consultas[index] = consulta;
        } else {
            this.consultas.push(consulta);
        }
    }
}

export class PagamentoRepositoryInMemory implements IPagamentoRepository {
    private pagamentos: Pagamento[] = [];

    public buscarPorConsulta(consultaId: string): Pagamento | null {
        return this.pagamentos.find(p => p.consultaId === consultaId) || null;
    }

    public salvar(pagamento: Pagamento): void {
        const index = this.pagamentos.findIndex(p => p.id === pagamento.id);
        if (index >= 0) {
            this.pagamentos[index] = pagamento;
        } else {
            this.pagamentos.push(pagamento);
        }
    }
}
