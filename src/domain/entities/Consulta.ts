export abstract class Consulta {
    constructor(
        public id: string,
        public pacienteId: string,
        public dentistaId: string,
        public valor: number,
        public statusConsulta: 'SOLICITADA' | 'AGENDADA' | 'REALIZADA' | 'CANCELADA'
    ) {}

    // Permite polimorfismo baseado na natureza da consulta
    public abstract get tipoConsulta(): string;

    public alterarStatus(novoStatus: 'SOLICITADA' | 'AGENDADA' | 'REALIZADA' | 'CANCELADA'): void {
        this.statusConsulta = novoStatus;
    }
}

export class ConsultaAvaliacao extends Consulta {
    public get tipoConsulta(): string {
        return 'AVALIACAO';
    }
}

export class ConsultaCirurgia extends Consulta {
    public get tipoConsulta(): string {
        return 'CIRURGIA';
    }
}
