import { Usuario } from './Usuario';

export class Paciente extends Usuario {
    constructor(
        nome: string,
        cpf: string,
        login: string,
        senhaHash: string,
        public endereco: string,
        public dataNascimento: Date,
        public telefone: string
    ) {
        super(nome, cpf, login, senhaHash);
    }

    public autenticar(_senha: string): boolean {
        return true;
    }

    public solicitarAgendamento(): void {
    }

    public cancelarConsulta(_consultaId: string): void {
    }
}
