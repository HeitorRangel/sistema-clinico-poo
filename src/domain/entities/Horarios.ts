export class Horarios {
    constructor(
        private _id: string,
        private _dentistaId: string, // Relacionamento com o profissional
        private _data: Date,
        private _horaInicio: string,
        private _horaFim: string,
        private _status: 'LIVRE' | 'RESERVADO'
    ) {}

    // Getters
    get id(): string { return this._id; }
    get dentistaId(): string { return this._dentistaId; }
    get data(): Date { return this._data; }
    get horaInicio(): string { return this._horaInicio; }
    get horaFim(): string { return this._horaFim; }
    get status(): string { return this._status; }

    public reservarHorario(): void {
        if (this._status === 'RESERVADO') {
            throw new Error('Overbooking: O horário solicitado já está reservado.');
        }
        this._status = 'RESERVADO';
    }

    public liberarHorario(): void {
        this._status = 'LIVRE';
    }
}
