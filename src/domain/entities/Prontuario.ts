export class Prontuario {
    constructor(
        private _id: string,
        private _pacienteId: string,
        private _observacoesClinicas: string,
        private _listaExames: string[],
        private _procedimentosRealizados: string[]
    ) {}

    // Getters
    get id(): string { return this._id; }
    get pacienteId(): string { return this._pacienteId; }
    get observacoesClinicas(): string { return this._observacoesClinicas; }
    get listaExames(): string[] { return this._listaExames; }
    get procedimentosRealizados(): string[] { return this._procedimentosRealizados; }

    public adicionarExame(exame: string): string {
        this._listaExames.push(exame);
        return `Exame '${exame}' adicionado ao prontuário ${this._id}.`;
    }

    public adicionarProcedimento(procedimento: string): string {
        this._procedimentosRealizados.push(procedimento);
        return `Procedimento '${procedimento}' registrado no prontuário ${this._id}.`;
    }
}
