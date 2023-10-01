import React, { useEffect, useState } from 'react';
import AddTask from 'components/ToDoTask/AddTask';
import { MDBCard, MDBCardBody, MDBIcon } from 'mdb-react-ui-kit';
import TaskList from 'components/ToDoTask/TaskList';
import { addTask, deleteTask, getTasks, updateTask } from 'api/todotask';
import { ToastContainer, toast } from 'react-toastify';

const ToDoTask: React.FC = () => {

   const [taskList, setTaskList] = useState<ToDoTask[]>([]); 
   const [loading, setLoading] = useState<boolean>(false);

   // useEffect hook to fetch tasks when the component mounts
   useEffect(() => {
      getToDoAllTasks().then().catch();
   }, []);

   // Function to add a new task
   const AddNewTask = async (title: string, dueDate?: Date | null): Promise<void> => {
      setLoading(true);
      await addTask(title, dueDate).then(()=>toast.success('The task has been successfully added.')).catch(()=>{ setLoading(false); });
      setLoading(false);
      // Refresh the task list
      await getToDoAllTasks().then().catch();
   };

   // Function to fetch all tasks
   const getToDoAllTasks = async (): Promise<void> => {
      setLoading(true);
      const toDoTasks = await getTasks().then().catch();
      setTaskList(toDoTasks); // Update the task list with fetched tasks
      setLoading(false);
   };

   // Function to handle task deletion
   const handleDeleteToDoTask = async (id: string): Promise<void> => {
      setLoading(true);
      await deleteTask(id).then(()=>toast.success('The task has been successfully deleted.')).catch(()=>{ setLoading(false); });
      setLoading(false);
      // Refresh the task list
      await getToDoAllTasks();
   };

   // Function to handle task status change
   const handleToDoTaskStatusChange = async (toDoTask: ToDoTask): Promise<void> => {
      setLoading(true);
      await updateTask({ ...toDoTask, isDone: !toDoTask.isDone }).then(()=>!toDoTask.isDone && toast.success('Great! The task has been marked as done.')).catch(()=>{ setLoading(false); });
      setLoading(false);
      // Refresh the task list
      await getToDoAllTasks().then().catch();
   };

   // Function to handle task update
   const handleToDoTaskUpdate = async (toDoTask: ToDoTask): Promise<void> => {
      setLoading(true);
      await updateTask(toDoTask).then(()=> toast.success('Success! The task has been updated.')).catch(()=>{ setLoading(false); });
      setLoading(false);
     
      // Refresh the task list
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
                  loading={loading}
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
