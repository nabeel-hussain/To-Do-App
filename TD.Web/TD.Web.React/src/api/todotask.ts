import httpClient from "shared/http/httpClient";

export const getTasks = async () => {
    let res = await httpClient.get("/api/ToDoTask/Get");
    let result: Array<ToDoTask> = res.data;
    return result;
  };

export const addTask = async (title: string, dueDate: Date) =>{
    let res = await httpClient.post("/api/ToDoTask/Create",{title,dueDate})
    let result: ToDoTask = res.data;
    return result;
}
export const updateTask = async (toDoTask: ToDoTask) =>{
    let res = await httpClient.put("/api/ToDoTask/Update",toDoTask)
    let result: ToDoTask = res.data;
    return result;
}