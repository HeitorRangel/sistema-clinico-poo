import { Usuario } from '../../domain/entities/Usuario';
import { IUsuarioRepository } from '../../domain/repositories/interfaces';

export class CadastrarUsuarioUseCase {
    constructor(private usuarioRepository: IUsuarioRepository) {}

    public executar(usuario: Usuario): void {
        const existe = this.usuarioRepository.buscarPorCpf(usuario.cpf);

        // Impede o cadastro duplicado de CPF
        if (existe) {
            throw new Error(`Já existe um cadastro ativo para o CPF ${usuario.cpf}.`);
        }
        
        this.usuarioRepository.salvar(usuario);
    }
}
