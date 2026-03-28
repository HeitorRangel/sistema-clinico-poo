export class Horarios {
    constructor(
        public id: string,
        public dentistaId: string, // Relacionamento com o profissional
        public data: Date,
        public horaInicio: string,
        public horaFim: string,
        public status: 'LIVRE' | 'RESERVADO'
    ) {}

    public reservarHorario(): void {
        if (this.status === 'RESERVADO') {
            throw new Error('Overbooking: O horário solicitado já está reservado.');
        }
        this.status = 'RESERVADO';
    }

    public liberarHorario(): void {
        this.status = 'LIVRE';
    }
}
