import { Database } from "./database.js";
import { randomUUID } from "node:crypto";
import { buildRoutePath } from "./utils/build-route-path.js";

const TASK_TABLE = "tasks";

const database = new Database();
await database.init();

export const routes = [
  {
    method: "POST",
    path: buildRoutePath("/tasks"),
    handler: async (req, res) => {
      const { body } = req;

      const isValidTask = body.title && body.description;

      if (!isValidTask) {
        return res
          .writeHead(406)
          .end(
            "Tarefa inválida! Favor preencher os campos de título e descrição."
          );
      }

      const task = {
        ...body,
        id: randomUUID(),
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      };

      try {
        database.insert(TASK_TABLE, task);
        return res.writeHead(200).end("Tarefa cadastrada com sucesso");
      } catch (error) {
        return res.writeHead(500).end(error);
      }
    },
  },
  {
    method: "GET",
    path: buildRoutePath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select(TASK_TABLE);
      return res.writeHead(200).end(tasks);
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {body, params: {id}} = req

      const task = database.updateTask(TASK_TABLE, id, body)

      if(task){
        return res.writeHead(200).end(task)
      } 
      return res.writeHead(404).end("Task não encontrada")
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {params: {id}} = req

      const task = database.deleteTask(TASK_TABLE, id)

      if(task){
        return res.writeHead(200).end(task)
      }

      return res.writeHead(404).end("Task não encontrada")
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params

      const task = database.toogleTaskStatus(TASK_TABLE, id)
    
       if(task){
        return res.writeHead(200).end(task)
      }

      return res.writeHead(404).end("Task não encontrada")
    },
  },
];
