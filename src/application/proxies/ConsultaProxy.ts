import { IConsultaService } from '../interfaces/IConsultaService';
import { Usuario } from '../../domain/entities/Usuario';
import { Consulta } from '../../domain/entities/Consulta';

export class ConsultaProxy implements IConsultaService {
  constructor(private consultaService: IConsultaService) {}
  ublic async marcarConsulta(usuarioLogado: Usuario, tipoConsulta: string): Promise<Consulta> {

    //  REGRA DE ACESSO
    if (usuarioLogado.tipo !== 'PACIENTE') {
      throw new Error('Apenas pacientes podem marcar consultas');
    }

    //  chama o service real
    return await this.consultaService.marcarConsulta(usuarioLogado, tipoConsulta);
  }

  public async listarConsultas(usuarioLogado: Usuario): Promise<Consulta[]> {

    //  REGRA DE ACESSO
    if (usuarioLogado.tipo !== 'PACIENTE') {
      throw new Error('Apenas pacientes podem listar consultas');
    }

    //  delega pro service
    return await this.consultaService.listarConsultas(usuarioLogado);
  }
}
