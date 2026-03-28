export class Prontuario {
    constructor(
        public id: string,
        public pacienteId: string,
        public observacoesClinicas: string,
        public listaExames: string[],
        public procedimentosRealizados: string[]
    ) {}

    public adicionarExame(exame: string): void {
        this.listaExames.push(exame);
    }

    public adicionarProcedimento(procedimento: string): void {
        this.procedimentosRealizados.push(procedimento);
    }
}
