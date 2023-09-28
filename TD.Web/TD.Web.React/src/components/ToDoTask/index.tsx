import React, { useEffect, useState } from 'react';
import AddTask from 'components/ToDoTask/AddTask';
import { MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import TaskList from 'components/ToDoTask/TaskList';
import { addTask, getTasks, updateTask } from 'api/todotask';


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

const handleToDoTaskStatusChange = async (toDoTask: ToDoTask) => {
      debugger;
      await updateTask({...toDoTask, isDone: !toDoTask.isDone})
      getToDoAllTasks();
}
   return (
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
         <MDBCol>
            <MDBCard id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
               <MDBCardBody className="py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                     <MDBIcon fas icon="check-square" className="me-1" />
                     <u>My Todo-s</u>
                  </p>
                  <AddTask onAdd={AddNewTask}/> <hr className="my-4" />
                  <TaskList tasks={taskList} onStatusChange={handleToDoTaskStatusChange} />
                 
               </MDBCardBody>
            </MDBCard>
         </MDBCol>
      </MDBRow>
   );
};
export default ToDoTask;
