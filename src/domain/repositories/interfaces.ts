import { Usuario } from '../entities/Usuario';
import { Prontuario } from '../entities/Prontuario';
import { Consulta } from '../entities/Consulta';

// Interfaces para aplicar a Inversão de Dependência (DIP) com repositórios.
export interface IUsuarioRepository {
    buscarPorCpf(cpf: string): Usuario | null;
    salvar(usuario: Usuario): void;
}

export interface IConsultaRepository {
    buscarPorDentistaEPaciente(dentistaId: string, pacienteId: string): Consulta[];
    salvar(consulta: Consulta): void;
    buscarPorPaciente(cpf: string): Consulta[];
}

export interface IProntuarioRepository {
    buscarPorId(id: string): Prontuario | null;
}
