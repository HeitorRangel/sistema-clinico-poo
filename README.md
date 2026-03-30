# 🦷 Sistema de Clínicas Odontológicas - Back-end POO

Nesta etapa do projeto, nossa modelagem de Orientação a Objetos atingiu um ponto sólido! Construímos toda a camada central (Clean Architecture) com base nos Diagramas de Classes e Casos de Uso. 

Para avançarmos agora para a fase dos Controladores (API Web) e testes de Regras de Negócio complexas, o projeto passou a **exigir o ecossistema do Node.js**.

---

## 🛠️ Por que precisamos do Node.js agora?

O Node.js permite executar códigos JavaScript/TypeScript fora do navegador. Precisamos dele no nosso projeto de Back-end por dois motivos fundamentais:

1. **Gestor de Dependências (NPM):** Ele nos entrega o comando `npm`, que usamos para instalar o motor de compilação rigoroso do **TypeScript**, validando de fato que nossas Classes, Interfaces e Heranças estão blindadas contra erros (_type checking_).
2. **Servidor HTTP Vivo (Próxima Fase):** Em breve instalaremos bibliotecas de rotas (como o Express.js). Só o Node.js é capaz de manter a sua máquina rodando "escutando a porta 8080" para o Cliente enviar requisições e a Clínica responder no formato JSON.

---

## 🚀 Passo a Passo: Instalação e Preparação do Ambiente

Seja você um programador da equipe puxando (_pull_) essa nova versão ou clonando o sistema pela primeira vez, siga os passos estritamente nesta ordem:

### Passo 1: Instale o Node.js na sua Máquina
Se você ainda não tem, faça o download.
1. Acesse o [Site Oficial do Node.js (Download)](https://nodejs.org/pt).
2. Escolha sempre a aba principal e clique no botão **Instalador Windows (.msi)** ou equivalente para o Mac/Linux. Não instale versões marcadas com Docker se você não é devops!
3. Execute o instalador ("Avançar", "Avançar", "Concluir").
4. **Feche e abra novamente a sua IDE (VS Code)** para o terminal reconhecer a instalação.
5. Verifique no terminal se funcionou rodando: `node -v` e `npm -v`.

### Passo 2: Inicialize o Projeto (Download dos Pacotes)
Toda a configuração de bibliotecas que usamos agora está mapeada no arquivo `package.json`. No terminal, dentro da pasta raiz do projeto, digite:
```bash
npm install
```
Dessa forma, o Node vai baixar os pacotes exclusivos deste projeto (como o compilador do Typescript) para dentro da pasta oculta chamada `node_modules` (que deve ser obrigatoriamente ignorada no Git).

### Passo 3: Verifique a Compilação do TypeScript!
Com tudo pronto, toda vez que você programar em algum arquivo `.ts` e quiser ter certeza de que você não infringiu nenhuma Interface de Repositório ou Regra de Typescript, apenas execute:
```bash
npx tsc --noEmit
```
**E pronto!** Se o terminal não devolver nenhuma mensagem de erro e simplesmente pular de linha, a sua Arquitetura está 100% íntegra e sem "gambiarras" (limpamos todos os tipos _`any`_ e forçamos contratos seguros).

---

## 📋 Como Estamos Hoje (Repositórios Em-Memória)

**Atenção Equipe:** Para permitir o rápido desenvolvimento dos _Use Cases_ pelas Duplas, optamos pela abordagem recomendada no isolamento das camadas. 
Nossos repositórios **ainda não escrevem no Banco de Dados Real (SQL)**. Para salvar um Prontuário, estamos usando "Bancos Fakes" salvos literalmente na memória interna (`src/infrastructure/repositories/in-memory`). 
Isso permite você programar toda a interface, validar a aplicação rodando, e plugar o Prisma/SQL só no último minuto sem quebrar uma linha de regras da clínica!
