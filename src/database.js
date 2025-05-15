import fs from "node:fs/promises";

const databasePath = new URL("../db.json", import.meta.url);

export class Database {
  #database = {};

  async init() {
    try {
      const file = await fs.readFile(databasePath, "utf-8");
      this.#database = JSON.parse(file);
    } catch {
      this.#persist();
    }
  }

  #persist() {
    fs.writeFile(databasePath, JSON.stringify(this.#database));
  }

  insert(table, data) {
    if (Array.isArray(this.#database[table])) {
      this.#database[table].push(data);
    } else {
      this.#database[table] = [data];
    }

    this.#persist();

    return JSON.stringify(data);
  }

  updateTask(table, id, update){
    let newTask = {}

    if(Array.isArray(this.#database[table])){
      const taskIndex = this.#database[table].findIndex(task => task.id===id)

      if(taskIndex > -1) {
        const task = this.#database[table][taskIndex] 
        const newTitle = update.title || task.title
        const newDescription = update.description || task.description

        newTask = {...task, title: newTitle, description: newDescription}
        this.#database[table][taskIndex] = newTask

        this.#persist()
        return JSON.stringify(newTask)
      };
    }
    return undefined;
  }

  deleteTask(table, id){
    if(Array.isArray(this.#database[table])){
      const taskIndex = this.#database[table].findIndex((task)=>task.id === id)
      
      if(taskIndex > -1) {
        const taskDeleted = this.#database[table].splice(taskIndex, 1)
        this.#persist()
        return JSON.stringify(taskDeleted);
      }
    } 
    return undefined;
  }

  toogleTaskStatus(table, id){
    if(Array.isArray(this.#database[table])){
      const taskIndex = this.#database[table].findIndex((task)=>task.id === id)
      
      if(taskIndex > -1) {
        if(this.#database[table][taskIndex].completed_at === null){
          this.#database[table][taskIndex].completed_at = new Date();
        } else{
          this.#database[table][taskIndex].completed_at = null
        }

        this.#persist()

        const taskUpdated = this.#database[table][taskIndex]
        return JSON.stringify(taskUpdated);

      }
    }
    return undefined;
  }

  select(table) {
    return JSON.stringify(this.#database[table]);
  }
}
