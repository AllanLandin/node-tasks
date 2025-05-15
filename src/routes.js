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

      if (!body) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "body is required." }));
      }

      if (!body.title) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "title is required." }));
      }

      if (!body.description) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "description is required." }));
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
        return res
          .writeHead(200)
          .end(JSON.stringify({ message: "task inserted successfully." }));
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
      const {
        body,
        params: { id },
      } = req;

      if (!body) {
        return res
          .writeHead(400)
          .end(JSON.stringify({ message: "body is required." }));
      }

      const task = database.updateTask(TASK_TABLE, id, body);

      if (task) {
        return res.writeHead(200).end(task);
      }
      return res
        .writeHead(404)
        .end(JSON.stringify({ message: "task not found." }));
    },
  },
  {
    method: "DELETE",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const {
        params: { id },
      } = req;

      const task = database.deleteTask(TASK_TABLE, id);

      if (task) {
        return res.writeHead(200).end(task);
      }

      return res
        .writeHead(404)
        .end(JSON.stringify({ message: "task not found." }));
    },
  },
  {
    method: "PATCH",
    path: buildRoutePath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params;

      const task = database.toogleTaskStatus(TASK_TABLE, id);

      if (task) {
        return res.writeHead(200).end(task);
      }

      return res
        .writeHead(404)
        .end(JSON.stringify({ message: "task not found." }));
    },
  },
];
