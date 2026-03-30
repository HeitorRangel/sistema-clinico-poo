import { Usuario } from './Usuario';
import { Prontuario } from './Prontuario';
import { Paciente } from './Paciente';

export class Dentista extends Usuario {
    constructor(
        nome: string,
        cpf: string,
        login: string,
        senhaHash: string,
        private _registroCRO: string
    ) {
        super(nome, cpf, login, senhaHash);
    }

    get registroCRO(): string { return this._registroCRO; }

    public autenticar(_senha: string): boolean {
        return true;
    }

    public registrarProntuario(_paciente: Paciente, _prontuario: Prontuario): void {
        // Será protegido pelo ControleAcessoProxy
    }
}
