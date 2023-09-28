import React, { useEffect, useState } from 'react';
import AddTask from 'components/ToDoTask/AddTask';
import { MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import TaskList from 'components/ToDoTask/TaskList';
import { addTask, deleteTask, getTasks, updateTask } from 'api/todotask';


const ToDoTask: React.FC = () => {
const [taskList, setTaskList] = useState<ToDoTask[]>([]);

useEffect(() => {
   getToDoAllTasks();
}, []);


const AddNewTask = async (title: string,dueDate: Date)=>{
   let newTask = await addTask(title,dueDate);
   getToDoAllTasks();
   console.log(newTask);
}

const getToDoAllTasks = async () => {
   let toDoTasks = await getTasks();
   setTaskList(toDoTasks);
   console.log(toDoTasks);
};

const handleDeleteToDoTask = async (id: string)=>{
   await deleteTask(id)
   getToDoAllTasks()
}
const handleToDoTaskStatusChange = async (toDoTask: ToDoTask) => {
      debugger;
      await updateTask({...toDoTask, isDone: !toDoTask.isDone})
      getToDoAllTasks();
}
const handleToDoTaskUpdate = async (toDoTask: ToDoTask) => {
   debugger;
   await updateTask(toDoTask)
   getToDoAllTasks();
}
   return (
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
         <MDBCol>
            <MDBCard id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
               <MDBCardBody className="py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                     <MDBIcon fas icon="check-square" className="me-1" />
                     Tasks
                  </p>
                  <AddTask onAdd={AddNewTask}/> <hr className="my-4" />
                  <TaskList onUpdate={handleToDoTaskUpdate} tasks={taskList} onStatusChange={handleToDoTaskStatusChange} onDelete={handleDeleteToDoTask} />
                 
               </MDBCardBody>
            </MDBCard>
         </MDBCol>
      </MDBRow>
   );
};
export default ToDoTask;
