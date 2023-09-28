import React, { useState } from 'react';
import AddTask from 'components/ToDoTask/AddTask';
import { MDBCard, MDBCardBody, MDBCol, MDBIcon, MDBRow } from 'mdb-react-ui-kit';
import TaskList from 'components/ToDoTask/TaskList';
import ReactDatePicker from 'react-datepicker';
const ToDoTask: React.FC = () => {
   return (
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
         <MDBCol>
            <MDBCard id="list1" style={{ borderRadius: '.75rem', backgroundColor: '#eff1f2' }}>
               <MDBCardBody className="py-4 px-4 px-md-5">
                  <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
                     <MDBIcon fas icon="check-square" className="me-1" />
                     <u>My Todo-s</u>
                  </p>
                  <AddTask /> <hr className="my-4" />
                  <TaskList />
                 

               </MDBCardBody>
            </MDBCard>
         </MDBCol>
      </MDBRow>
   );
};
export default ToDoTask;
