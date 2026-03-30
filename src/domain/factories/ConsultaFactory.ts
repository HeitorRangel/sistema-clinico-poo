import { Consulta, ConsultaAvaliacao, ConsultaCirurgia } from '../entities/Consulta';

// Factory Method: Centraliza a criação de consultas, facilitando a adição de novos tipos (Open-Closed).
export class ConsultaFactory {
    public static criarConsulta(
        tipo: string,
        id: string,
        pacienteId: string,
        dentistaId: string,
        horarioId: string,
        valorBase: number
    ): Consulta {
        switch (tipo.toUpperCase()) {
            case 'AVALIACAO':
                return new ConsultaAvaliacao(id, pacienteId, dentistaId, horarioId, valorBase, 'SOLICITADA');
            
            case 'CIRURGIA':
                const sobretaxaCirurgica = 250.00;
                return new ConsultaCirurgia(id, pacienteId, dentistaId, horarioId, valorBase + sobretaxaCirurgica, 'SOLICITADA');
            
            default:
                throw new Error(`O tipo de consulta informado (${tipo}) não é suportado.`);
        }
    }
}
