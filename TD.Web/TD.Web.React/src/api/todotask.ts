import httpClient from "shared/http/httpClient";

export const getTasks = async () => {
    let res = await httpClient.get("/api/ToDoTask/Get");
    let result: Array<ToDoTask> = res.data;
    return result;
  };