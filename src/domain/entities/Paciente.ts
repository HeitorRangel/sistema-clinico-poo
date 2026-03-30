import { Usuario } from './Usuario';

export class Paciente extends Usuario {
    constructor(
        nome: string,
        cpf: string,
        login: string,
        senhaHash: string,
        private _endereco: string,
        private _dataNascimento: Date,
        private _telefone: string
    ) {
        super(nome, cpf, login, senhaHash);
    }

    get endereco(): string { return this._endereco; }
    get dataNascimento(): Date { return this._dataNascimento; }
    get telefone(): string { return this._telefone; }

    public autenticar(_senha: string): boolean {
        return true;
    }

    public solicitarAgendamento(): void {
    }

    public cancelarConsulta(_consultaId: string): void {
    }
}
