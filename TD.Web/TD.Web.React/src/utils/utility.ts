export const countPendingTasks = (tasks: ToDoTask[]): number => {
   const pendingTasks = tasks.filter((task) => !task.isDone);
   return pendingTasks.length;
};
export const isEmptyOrNull = <T>(value?: T | null | undefined): boolean => {
   return !!(
      value === undefined ||
      value === null ||
      (typeof value === 'string' && value.trim() === '')
   );
};
export const isNull = <T>(value?: T | null | undefined): boolean => {
   return !!(value === undefined || value === null);
};
