import { GridRowId, GridValidRowModel } from '@mui/x-data-grid';

export const countPendingTasks = (taskMap: Map<GridRowId, GridValidRowModel>): number => {
   let count = 0;
   for (const [, task] of taskMap) {
      if (!task.isDone) {
         count++;
      }
   }
   return count;
};
