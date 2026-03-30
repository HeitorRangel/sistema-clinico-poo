import { IConsultaService } from '../interfaces/IConsultaService';
import { Usuario } from '../../domain/entities/Usuario';
import { Consulta } from '../../domain/entities/Consulta';
import { Paciente } from '../../domain/entities/Paciente';

export class ConsultaProxy implements IConsultaService {
  constructor(private consultaService: IConsultaService) { }
  public async marcarConsulta(usuarioLogado: Usuario, tipoConsulta: string, dataConsulta: Date): Promise<Consulta> {

    //  REGRA DE ACESSO
    if (!(usuarioLogado instanceof Paciente)) {
      throw new Error('Apenas pacientes podem marcar consultas');
    }

    //  chama o service real
    return await this.consultaService.marcarConsulta(usuarioLogado, tipoConsulta, dataConsulta);
  }

  public async listarConsultas(usuarioLogado: Usuario): Promise<Consulta[]> {

    //  REGRA DE ACESSO
    if (!(usuarioLogado instanceof Paciente)) {
      throw new Error('Apenas pacientes podem listar consultas');
    }

    //  delega pro service
    return await this.consultaService.listarConsultas(usuarioLogado);
  }
}
