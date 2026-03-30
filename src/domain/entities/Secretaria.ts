import { Usuario } from './Usuario';
import { Consulta } from './Consulta';

export class Secretaria extends Usuario {
    constructor(
        nome: string,
        cpf: string,
        login: string,
        senhaHash: string,
        private _matricula: string
    ) {
        super(nome, cpf, login, senhaHash);
    }

    get matricula(): string { return this._matricula; }

    public autenticar(_senha: string): boolean {
        return true; 
    }

    public validarCadastro(_cpfCandidato: string): boolean {
        return true;
    }

    public aprovarAgendamento(consulta: Consulta): void {
        consulta.alterarStatus('AGENDADA');
    }
}
