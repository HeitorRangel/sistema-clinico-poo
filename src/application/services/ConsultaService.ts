import { IConsultaService } from '../interfaces/IConsultaService';
import { IConsultaRepository } from '../../domain/repositories/interfaces';
import { Usuario } from '../../domain/entities/Usuario';
import { Consulta } from '../../domain/entities/Consulta';

export class ConsultaService implements IConsultaService {
  constructor(private consultaRepository: IConsultaRepository) {}
  
  public async marcarConsulta(usuarioLogado: Usuario, tipoConsulta: string): Promise<Consulta> {
    const consulta: Consulta = {
      pacienteCpf: usuarioLogado.cpf,
      tipo: tipoConsulta,
      data: new Date()
    } as Consulta;

    await this.consultaRepository.salvar(consulta);
    return consulta;
  }

   public async listarConsultas(usuarioLogado: Usuario): Promise<Consulta[]> {
        return await this.consultaRepository.buscarPorPaciente(usuarioLogado.cpf);
    }
}
