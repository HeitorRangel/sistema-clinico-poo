import { Usuario } from '../../domain/entities/Usuario';
import { Consulta } from '../../domain/entities/Consulta';

export interface IConsultaService {
    marcarConsulta(usuarioLogado: Usuario, tipoConsulta: string, dataConsulta: Date): Promise<Consulta>;
    listarConsultas(usuarioLogado: Usuario): Promise<Consulta[]>;
}
