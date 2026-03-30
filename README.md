# Sistema de Gestao de Clinicas Odontologicas

## Modulo Back-end (TypeScript)

### Visao Geral
Este repositorio contem o back-end do Sistema de Gestao de Clinicas Odontologicas. O sistema foi projetado para assegurar as regras de negocio centrais exigidas por profissionais de saude (Dentistas, Secretarias e Pacientes), gerenciando fluxos criticos como Prontuarios, Consultas, Horarios e Pagamentos.

### Arquitetura de Software
A arquitetura do projeto segue os preceitos rigorosos da **Clean Architecture** (Arquitetura Limpa) em conjunto com **TDD**, almejando alto isolamento e manutencao facilitada.

Atualmente o sistema consolida as seguintes camadas implementadas:

1. **Entities / Domain (Camada Central)**
   A principal definicao dos Atores e Elementos, incluindo a gerencia do escopo da `Consulta` amarrada individualmente aos `Horarios` pre-aprovados pela `Secretaria`, e o historico vitalicio via `Prontuario` exclusivo de cada `Paciente`. As entidades base nao tem dependencia externa, sendo regidas pelas intefaces rigorosas desenvolvidas (`IDentistaRepository`, `IPagamentoRepository`, etc.).

2. **Design Patterns Utilizados**
   O projeto empregou padroes do GoF para escalabilidade:
   * **Factory Method (`ConsultaFactory`):** Centralizacao da instanciacao de especializacoes abstratas (Avaliatoria vs Cirurgica), injetando variacoes de regras e taxas sem quebrar contratos da entidade base.
   * **Proxy Pattern (`ControleAcessoProxy` / `ConsultaProxy`):** Separacao (SRP) restrita do Controle de Acesso e Regras de Permissoes baseada em Polimorfismo. Interceptadores validam a Autenticacao e limitacao de leitura de prontuarios baseados no `CPF`/`CRO`.

3. **Infrastructure (Data Storage)**
   O projeto se encontra no estagio de Validacao de Casos de Uso (Application Rules). Para isolar a logica de negocio pura, os bancos de dados estao operando **Em-Memoria** (`/in-memory`). Os repositorios prevem a falsificacao perfeita das Consultas assincronas que serao posteriomente implementadas (ORM / SQL).

### Pre-Requisitos e Ambiente
O back-end do sistema requer as seguintes dependencias de ambiente para o _typechecking_ e futuras disposicoes de Boundary (Web API).
* **Node.js** (Ambiente de execucao assincrono voltado a requisicoes HTTP e gerencia de pacotes)
* TypeScript Compiler nativo (via instalacao `npm`)

### Proximos Passos (Em Andamento)
O desenvolvimento foca atualmente na instanciacao dos Casos de Uso (Application Rules), mapeando o roteamento da Secretaria, fluxos unificados de solicitacao/aprovacao da Consulta e, em fase subsequente, Controladores HTTP para as APIs.
