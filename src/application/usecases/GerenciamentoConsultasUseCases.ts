import { IConsultaRepository, IHorariosRepository } from '../../domain/repositories/interfaces';
import { Paciente } from '../../domain/entities/Paciente';
import { Secretaria } from '../../domain/entities/Secretaria';
import { Consulta } from '../../domain/entities/Consulta';
import { ConsultaFactory } from '../../domain/factories/ConsultaFactory';

export class SolicitarConsultaUseCase {
    constructor(
        private readonly horariosRepo: IHorariosRepository,
        private readonly consultaRepo: IConsultaRepository
    ) {}

    public async executar(paciente: Paciente, tipo: string, horarioId: string): Promise<Consulta> {
        // Tabela de Preços do Domínio (Blindado do Cliente Web)
        const valorTabelado = 150.00;

        // Verifica disponibilidade de horário
        const horario = this.horariosRepo.buscarPorId(horarioId);
        if (!horario) throw new Error('Horário inexistente.');
        
        if (horario.status !== 'LIVRE') {
            throw new Error('Horário indisponível para marcação.');
        }

        // Reserva de horário
        horario.reservarHorario();
        this.horariosRepo.salvar(horario);

        // Construção da entidade Consulta
        const idGerado = `consulta-${Date.now()}`;
        const novaConsulta = ConsultaFactory.criarConsulta(tipo, idGerado, paciente.cpf, horario.dentistaId, horario.id, valorTabelado);

        // Persistência da Consulta pendente
        this.consultaRepo.salvar(novaConsulta);

        return novaConsulta;
    }
}

export class AprovarConsultaUseCase {
    constructor(private readonly consultaRepo: IConsultaRepository) {}

    public executar(secretaria: Secretaria, consultaId: string): Consulta {
        // Busca de agendamentos pendentes
        const consultasDisponiveis = this.consultaRepo.listar();
        const consultaAlvo = consultasDisponiveis.find((c: Consulta) => c.id === consultaId);

        if (!consultaAlvo) {
            throw new Error('Consulta não localizada no sistema.');
        }

        // Autorização de agendamento pela Secretária
        secretaria.aprovarAgendamento(consultaAlvo);
        this.consultaRepo.salvar(consultaAlvo);

        return consultaAlvo;
    }
}

export class CancelarConsultaUseCase {
    constructor(
        private readonly consultaRepo: IConsultaRepository,
        private readonly horariosRepo: IHorariosRepository
    ) {}

    public executar(paciente: Paciente, consultaId: string): void {
        const consultas = this.consultaRepo.buscarPorPaciente(paciente.cpf);
        const consultaAlvo = consultas.find((c: Consulta) => c.id === consultaId);

        if (!consultaAlvo) {
            throw new Error('Acesso não autorizado: Paciente não é dono desta consulta.');
        }

        // Operação de cancelamento pelo Paciente
        paciente.cancelarConsulta(consultaAlvo.id);
        
        // Atualização de status
        consultaAlvo.alterarStatus('CANCELADA');
        this.consultaRepo.salvar(consultaAlvo);

        // Liberação do horário na agenda do Dentista
        const horario = this.horariosRepo.buscarPorId(consultaAlvo.horarioId);
        if (horario) {
            horario.liberarHorario();
            this.horariosRepo.salvar(horario);
        }
    }
}
