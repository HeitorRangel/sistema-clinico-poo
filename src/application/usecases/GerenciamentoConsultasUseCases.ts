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

    public async executar(paciente: Paciente, tipo: string, horarioId: string, valorBase: number): Promise<Consulta> {
        // Busca o horário selecionado e verifica a disponibilidade real (Evita concorrencia de tela)
        const horario = this.horariosRepo.buscarPorId(horarioId);
        if (!horario) throw new Error('Horário inexistente.');
        
        if (horario.status !== 'LIVRE') {
            throw new Error('Horário indisponível para marcação.');
        }

        // Trava o horário usando a Regra de Negócio da própria entidade Horario
        horario.reservarHorario();
        this.horariosRepo.salvar(horario);

        // Fabrica a consulta já com os apontamentos core do Diagrama UML (1 Consulta -> 1 Horario)
        const idGerado = `consulta-${Date.now()}`;
        const novaConsulta = ConsultaFactory.criarConsulta(tipo, idGerado, paciente.cpf, horario.dentistaId, horario.id, valorBase);

        // Mantem o estado como SOLICITADA aguardando aprovação caso a clínica exija
        this.consultaRepo.salvar(novaConsulta);

        return novaConsulta;
    }
}

export class AprovarConsultaUseCase {
    constructor(private readonly consultaRepo: IConsultaRepository) {}

    public executar(secretaria: Secretaria, consultaId: string): Consulta {
        // Encontra no repositório geral as solicitações
        const consultasDisponiveis = this.consultaRepo.listar();
        const consultaAlvo = consultasDisponiveis.find((c: Consulta) => c.id === consultaId);

        if (!consultaAlvo) {
            throw new Error('Consulta não localizada no sistema.');
        }

        // A secretária usa sua capacidade de ator de domínio para mudar e dar aval
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

        // Entidade paciente usa seu direito do sistema de cancelar
        paciente.cancelarConsulta(consultaAlvo.id);
        
        // Alteração real de status
        consultaAlvo.alterarStatus('CANCELADA');
        this.consultaRepo.salvar(consultaAlvo);

        // O sistema deve ser inteligente de acordo com as regras (liberar novo horario no array do Dentista)
        const horario = this.horariosRepo.buscarPorId(consultaAlvo.horarioId);
        if (horario) {
            horario.liberarHorario();
            this.horariosRepo.salvar(horario);
        }
    }
}
