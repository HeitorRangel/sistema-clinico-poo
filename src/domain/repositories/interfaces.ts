import { Usuario } from '../entities/Usuario';
import { Paciente } from '../entities/Paciente';
import { Dentista } from '../entities/Dentista';
import { Secretaria } from '../entities/Secretaria';
import { Prontuario } from '../entities/Prontuario';
import { Consulta } from '../entities/Consulta';
import { Horarios } from '../entities/Horarios';
import { Pagamento } from '../entities/Pagamento';

export interface IUsuarioRepository {
    buscarPorCpf(cpf: string): Usuario | null;
    salvar(usuario: Usuario): void;
}

export interface IPacienteRepository {
    buscarPorCpf(cpf: string): Paciente | null;
    salvar(paciente: Paciente): void;
    listar(): Paciente[];
}

export interface IDentistaRepository {
    buscarPorCro(cro: string): Dentista | null;
    buscarPorCpf(cpf: string): Dentista | null;
    salvar(dentista: Dentista): void;
    listar(): Dentista[];
}

export interface ISecretariaRepository {
    buscarPorMatricula(matricula: string): Secretaria | null;
    salvar(secretaria: Secretaria): void;
}

export interface IConsultaRepository {
    buscarPorDentistaEPaciente(dentistaId: string, pacienteId: string): Consulta[];
    salvar(consulta: Consulta): void;
    buscarPorPaciente(cpf: string): Consulta[];
    listar(): Consulta[];
}

export interface IProntuarioRepository {
    buscarPorId(id: string): Prontuario | null;
    buscarPorPaciente(pacienteId: string): Prontuario | null;
    salvar(prontuario: Prontuario): void;
}

export interface IHorariosRepository {
    salvar(horarios: Horarios): void;
    buscarPorDentista(dentistaId: string): Horarios[];
    buscarDisponiveis(dentistaId: string): Horarios[];
    buscarPorId(id: string): Horarios | null;
}

export interface IPagamentoRepository {
    salvar(pagamento: Pagamento): void;
    buscarPorConsulta(consultaId: string): Pagamento | null;
}
