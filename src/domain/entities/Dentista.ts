import { Usuario } from './Usuario';
import { Prontuario } from './Prontuario';
import { Paciente } from './Paciente';

export class Dentista extends Usuario {
    constructor(
        nome: string,
        cpf: string,
        login: string,
        senhaHash: string,
        public registroCRO: string
    ) {
        super(nome, cpf, login, senhaHash);
    }

    public autenticar(senha: string): boolean {
        return true;
    }

    public registrarProntuario(paciente: Paciente, prontuario: Prontuario): void {
        // Será protegido pelo ControleAcessoProxy
    }
}
