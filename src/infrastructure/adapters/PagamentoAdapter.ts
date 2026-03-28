import { Pagamento } from '../../domain/entities/Pagamento';

// Porta de saída para pagamentos (DIP)
export interface IPagamentoGateway {
    processarTransacao(valor: number, metodo: string, token: string): boolean;
}

// Adapter: Converte nossa comunicação para o formato esperado por uma API externa (ex: Stripe).
export class StripePagamentoAdapter implements IPagamentoGateway {
    public processarTransacao(valor: number, metodo: string, token: string): boolean {
        // A integração real com a API financeira aconteceria aqui.
        if (valor > 0 && token === 'TOKEN_VALIDO') {
            return true;
        }
        return false;
    }
}

export class ProcessarPagamentoUseCase {
    constructor(private gateway: IPagamentoGateway) {}

    public executar(pagamento: Pagamento, tokenCobranca: string): void {
        const aprovado = this.gateway.processarTransacao(pagamento.valorPago, 'CARTAO', tokenCobranca);
        
        if (aprovado) {
            pagamento.realizarPagamento();
        } else {
            pagamento.statusPagamento = 'FALHOU';
            throw new Error('Falha no pagamento.');
        }
    }
}
