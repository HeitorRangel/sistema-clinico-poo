import { IConsultaService } from '../interfaces/IConsultaService';
import { IConsultaRepository } from '../../domain/repositories/interfaces';
import { Usuario } from '../../domain/entities/Usuario';
import { Consulta } from '../../domain/entities/Consulta';
import { ConsultaFactory } from '../../domain/factories/ConsultaFactory';

export class ConsultaService implements IConsultaService {
  constructor(private consultaRepository: IConsultaRepository) {}
  
  public async marcarConsulta(usuarioLogado: Usuario, tipoConsulta: string, horarioId: string): Promise<Consulta> {
    // Usamos a factory real (com ids simulados por enquanto até finalizarem a Tarefa 1)
    const consulta: Consulta = ConsultaFactory.criarConsulta(tipoConsulta, 'id-temp', usuarioLogado.cpf, 'dentista-null', horarioId, 0);

    // Casting apenas para satisfazer a compilacão caso a entidade base ainda sofra mudança na Tarefa 1:
    (consulta as any).horarioId = horarioId; 

    await this.consultaRepository.salvar(consulta);
    return consulta;
  }

   public async listarConsultas(usuarioLogado: Usuario): Promise<Consulta[]> {
        return await this.consultaRepository.buscarPorPaciente(usuarioLogado.cpf);
    }
}
