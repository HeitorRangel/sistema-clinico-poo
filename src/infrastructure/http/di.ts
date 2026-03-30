import { UsuarioRepositoryInMemory } from '../repositories/in-memory/UsuarioRepositoryInMemory';
import { PacienteRepositoryInMemory } from '../repositories/in-memory/UsuarioRepositoryInMemory';
import { DentistaRepositoryInMemory } from '../repositories/in-memory/UsuarioRepositoryInMemory';
import { SecretariaRepositoryInMemory } from '../repositories/in-memory/UsuarioRepositoryInMemory';
import { ProntuarioRepositoryInMemory } from '../repositories/in-memory/ProntuarioRepositoryInMemory';
import { HorariosRepositoryInMemory } from '../repositories/in-memory/HorariosRepositoryInMemory';
import { ConsultaRepositoryInMemory } from '../repositories/in-memory/ConsultaRepositoryInMemory';
import { PagamentoRepositoryInMemory } from '../repositories/in-memory/ConsultaRepositoryInMemory';

// Repositórios configurados como Singletons locais para simulação
export const usuarioRepo = new UsuarioRepositoryInMemory();
export const pacienteRepo = new PacienteRepositoryInMemory();
export const dentistaRepo = new DentistaRepositoryInMemory();
export const secretariaRepo = new SecretariaRepositoryInMemory();
export const prontuarioRepo = new ProntuarioRepositoryInMemory();
export const horariosRepo = new HorariosRepositoryInMemory();
export const consultaRepo = new ConsultaRepositoryInMemory();
export const pagamentoRepo = new PagamentoRepositoryInMemory();
