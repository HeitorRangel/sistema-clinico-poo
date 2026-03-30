export abstract class Consulta {
    constructor(
        private _id: string,
        private _pacienteId: string,
        private _dentistaId: string,
        private _horarioId: string,
        private _valor: number,
        private _statusConsulta: 'SOLICITADA' | 'AGENDADA' | 'REALIZADA' | 'CANCELADA'
    ) {}

    // Getters
    get id(): string { return this._id; }
    get pacienteId(): string { return this._pacienteId; }
    get dentistaId(): string { return this._dentistaId; }
    get horarioId(): string { return this._horarioId; }
    get valor(): number { return this._valor; }
    get statusConsulta(): string { return this._statusConsulta; }

    // Polimorfismo baseado em Tipo
    public abstract get tipoConsulta(): string;

    public alterarStatus(novoStatus: 'SOLICITADA' | 'AGENDADA' | 'REALIZADA' | 'CANCELADA'): string {
        this._statusConsulta = novoStatus;
        return `O status da consulta foi alterado com sucesso para ${this._statusConsulta}`;
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
