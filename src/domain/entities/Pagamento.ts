export class Pagamento {
    constructor(
        public id: string,
        public consultaId: string,
        public valorPago: number,
        public dataPagamento: Date | null,
        public statusPagamento: 'PAGO' | 'PENDENTE' | 'FALHOU'
    ) {}

    public realizarPagamento(): void {
        this.statusPagamento = 'PAGO';
        this.dataPagamento = new Date();
    }
}
