export abstract class Usuario {
    constructor(
        public nome: string,
        public cpf: string,
        public login: string,
        protected senhaHash: string
    ) {}

    public abstract autenticar(senha: string): boolean;
}
