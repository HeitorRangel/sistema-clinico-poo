export class Pagamento {
    constructor(
        private _id: string,
        private _pacienteId: string,
        private _consultaId: string,
        private _valorPago: number,
        private _dataPagamento: Date | null,
        private _statusPagamento: 'PAGO' | 'PENDENTE' | 'FALHOU'
    ) {}

    get id(): string { return this._id; }
    get pacienteId(): string { return this._pacienteId; }
    get consultaId(): string { return this._consultaId; }
    get valorPago(): number { return this._valorPago; }
    get dataPagamento(): Date | null { return this._dataPagamento; }
    get statusPagamento(): string { return this._statusPagamento; }
    set statusPagamento(novoStatus: 'PAGO' | 'PENDENTE' | 'FALHOU') { this._statusPagamento = novoStatus; }

    public realizarPagamento(): void {
        this._statusPagamento = 'PAGO';
        this._dataPagamento = new Date();
    }
}
