import { Usuario } from '../../domain/entities/Usuario';
import { Consulta } from '../../domain/entities/Consulta';

export interface IConsultaService {
    marcarConsulta(usuarioLogado: Usuario, tipoConsulta: string): Promise<Consulta>;
    listarConsulta(usuarioLogado: Usuario): Promise<Consulta[]>;
}
