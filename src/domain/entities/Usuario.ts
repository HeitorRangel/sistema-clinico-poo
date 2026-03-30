export abstract class Usuario {
    constructor(
        private _nome: string,
        private _cpf: string,
        private _login: string,
        private _senhaHash: string
    ) {}

    // Getters e Setters
    get nome(): string { return this._nome; }
    set nome(novoNome: string) { this._nome = novoNome; }
    
    get cpf(): string { return this._cpf; }
    get login(): string { return this._login; }
    get senha(): string { return this._senhaHash; }

    public abstract autenticar(senha: string): boolean;
}
