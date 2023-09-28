import httpClient from "shared/http/httpClient";

export const getTasks = async () => {
    const res = await httpClient.get("/api/ToDoTask/Get");
    const result: ToDoTask[] = res.data;
    return result;
  };

export const addTask = async (title: string, dueDate?: Date| null) =>{
    const res = await httpClient.post("/api/ToDoTask/Create",{title,dueDate})
    const result: ToDoTask = res.data;
    return result;
}
export const updateTask = async (toDoTask: ToDoTask) =>{
    const res = await httpClient.put("/api/ToDoTask/Update",toDoTask)
    const result: ToDoTask = res.data;
    return result;
}
export const deleteTask = async (id: string) =>{
    const res = await httpClient.delete("/api/ToDoTask/Delete",{params: {id}})
    const result: ToDoTask = res.data;
    return result;
}