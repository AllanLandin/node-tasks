# NODE TASK API 📖

## Descrição do projeto 🖋️
API (Application Programming Interface) criada para rodar em ambiente Node que cadastra, lê, altera e exclui tarefas (CRUD).

## Conceitos estudados 🧮
- Roteamento
- Streams
- Métodos HTTP
- Regex

## Como rodar ❓
Baixe o repositório com o seguinte comando:

`git clone https://github.com/AllanLandin/node-tasks.git`

Depois, crie um arquivo `.env` na raiz do projeto e configure uma variável de ambiente chamada `SERVER_PORT` para uma porta disponível da sua máquina.

Exemplo: `SERVER_PORT=3333`

## Rotas 🚀

- ### GET `http:localhost:SERVER_PORT/tasks`
  - Lista as tarefas cadastradas no arquivo.

- ### POST `http:localhost:SERVER_PORT/tasks`
  - Cadastra uma nova tarefa cadastradas no arquivo.

- ### PUT `http:localhost:SERVER_PORT/tasks/:id`
  - Altera uma tarefa. O usuário pode passar a propriedade 'title' e 'description' com novos valores no body da requisição.

 - ### DELETE `http:localhost:SERVER_PORT/tasks/:id`
  - Exclui uma tarefa.

- ### PATCH `http:localhost:SERVER_PORT/tasks/:id/complete`
  - Altera o atributo `completed_at`, definindo se a tarefa está marcada como `feita` ou `pendente`.

