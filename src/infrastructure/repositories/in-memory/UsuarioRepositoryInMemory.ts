import { IDentistaRepository, IPacienteRepository, ISecretariaRepository, IUsuarioRepository } from '../../../domain/repositories/interfaces';
import { Usuario } from '../../../domain/entities/Usuario';
import { Paciente } from '../../../domain/entities/Paciente';
import { Dentista } from '../../../domain/entities/Dentista';
import { Secretaria } from '../../../domain/entities/Secretaria';

export class UsuarioRepositoryInMemory implements IUsuarioRepository {
    private usuarios: Usuario[] = [];

    public buscarPorCpf(cpf: string): Usuario | null {
        return this.usuarios.find(u => u.cpf === cpf) || null;
    }

    public salvar(usuario: Usuario): void {
        const index = this.usuarios.findIndex(u => u.cpf === usuario.cpf);
        if (index >= 0) {
            this.usuarios[index] = usuario;
        } else {
            this.usuarios.push(usuario);
        }
    }
}

export class PacienteRepositoryInMemory implements IPacienteRepository {
    private pacientes: Paciente[] = [];

    public buscarPorCpf(cpf: string): Paciente | null {
        return this.pacientes.find(p => p.cpf === cpf) || null;
    }

    public listar(): Paciente[] {
        return this.pacientes;
    }

    public salvar(paciente: Paciente): void {
        const index = this.pacientes.findIndex(p => p.cpf === paciente.cpf);
        if (index >= 0) {
            this.pacientes[index] = paciente;
        } else {
            this.pacientes.push(paciente);
        }
    }
}

export class DentistaRepositoryInMemory implements IDentistaRepository {
    private dentistas: Dentista[] = [];

    public buscarPorCro(cro: string): Dentista | null {
        return this.dentistas.find(d => d.registroCRO === cro) || null;
    }

    public buscarPorCpf(cpf: string): Dentista | null {
        return this.dentistas.find(d => d.cpf === cpf) || null;
    }

    public listar(): Dentista[] {
        return this.dentistas;
    }

    public salvar(dentista: Dentista): void {
        const index = this.dentistas.findIndex(d => d.cpf === dentista.cpf);
        if (index >= 0) {
            this.dentistas[index] = dentista;
        } else {
            this.dentistas.push(dentista);
        }
    }
}

export class SecretariaRepositoryInMemory implements ISecretariaRepository {
    private secretarias: Secretaria[] = [];

    public buscarPorMatricula(matricula: string): Secretaria | null {
        return this.secretarias.find(s => s.matricula === matricula) || null;
    }

    public salvar(secretaria: Secretaria): void {
        const index = this.secretarias.findIndex(s => s.matricula === secretaria.matricula);
        if (index >= 0) {
            this.secretarias[index] = secretaria;
        } else {
            this.secretarias.push(secretaria);
        }
    }
}
