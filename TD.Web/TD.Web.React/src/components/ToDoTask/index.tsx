import React, { useEffect, useState } from 'react';
import AddTask from 'components/ToDoTask/AddTask';
import { MDBCard, MDBCardBody, MDBIcon } from 'mdb-react-ui-kit';
import TaskList from 'components/ToDoTask/TaskList';
import { addTask, deleteTask, getTasks, updateTask } from 'api/todotask';
import { ToastContainer, toast } from 'react-toastify';

const ToDoTask: React.FC = () => {
   const [taskList, setTaskList] = useState<ToDoTask[]>([]);

   useEffect(() => {
      getToDoAllTasks().then().catch();
   }, []);

   const AddNewTask = async (title: string, dueDate?: Date | null): Promise<void> => {
      const newTask = await addTask(title, dueDate).then().catch();
      toast.success('The task has been successfully added.');
      await getToDoAllTasks().then().catch();
      console.log(newTask);
   };
   const getToDoAllTasks = async (): Promise<void> => {
      const toDoTasks = await getTasks().then().catch();
      setTaskList(toDoTasks);
      console.log(toDoTasks);
   };

   const handleDeleteToDoTask = async (id: string): Promise<void> => {
      await deleteTask(id).then().catch();
      toast.success('The task has been successfully deleted.');
      await getToDoAllTasks();
   };
   const handleToDoTaskStatusChange = async (toDoTask: ToDoTask): Promise<void> => {
      await updateTask({ ...toDoTask, isDone: !toDoTask.isDone });

      !toDoTask.isDone && toast.success('Great! The task has been marked as done.');
      await getToDoAllTasks().then().catch();
   };
   const handleToDoTaskUpdate = async (toDoTask: ToDoTask): Promise<void> => {
      await updateTask(toDoTask);
      toast.success('Success! The task has been updated.');
      await getToDoAllTasks().then().catch();
   };
   return (
      <>
         <MDBCard id="list1" className="mdbcard-style" style={{}}>
            <MDBCardBody className="py-4 px-4 px-md-5 ">
               <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                  <MDBIcon fas icon="check-square" className="me-1" />
                  Tasks
               </p>
               <AddTask onAdd={AddNewTask} /> <hr className="my-4" />
               <TaskList
                  onUpdate={handleToDoTaskUpdate}
                  tasks={taskList}
                  onStatusChange={handleToDoTaskStatusChange}
                  onDelete={handleDeleteToDoTask}
               />
            </MDBCardBody>
         </MDBCard>
         <ToastContainer />
      </>
   );
};
export default ToDoTask;
