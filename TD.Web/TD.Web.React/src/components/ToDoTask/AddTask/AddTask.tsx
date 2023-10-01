import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import ReactDatePicker from 'react-datepicker';

// Define the Props interface for the AddTask component
interface Props {
   onAdd: (title: string, dueDate?: Date | null) => Promise<void>; // Callback to add a new task
}

const AddTask: React.FC<Props> = ({ onAdd }: Props) => {
   const [dueDate, setdueDate] = useState<Date | null>(null); // Due date for the task
   const [showDatePicker, setShowDatePicker] = useState(false); // Controls the visibility of the date picker
   const [title, setTitle] = useState(''); // Title of the new task

   // Handler for changing the due date
   const handleDueDateChange = (date: Date): void => {
      setdueDate(date);
      setShowDatePicker(false);
   };

   // Handler for adding a new task
   const handleAddToDoTask = async (): Promise<void> => {
      // Call the provided onAdd callback with the title and dueDate
      await onAdd(title, dueDate).then().catch();
      
      // Clear the title and reset the dueDate
      setTitle('');
      setdueDate(null);
   };

   return (
      <>
         <div className="pb-2">
            <MDBCard>
               <MDBCardBody>
                  <div className="d-flex flex-row align-items-center">
                     {/* Input field for entering task title */}
                     <input
                        onChange={(e) => {
                           setTitle(e.target.value);
                        }}
                        value={title}
                        type="text"
                        className="form-control form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="Add new..."
                     />
                     
                     {/* Tooltip and icon for setting a due date */}
                     <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Set due date">
                        <MDBIcon
                           fas
                           icon="calendar-alt"
                           size="lg"
                           className="me-3"
                           onClick={() => {
                              setShowDatePicker(!showDatePicker);
                           }}
                        />{' '}
                     </MDBTooltip>

                     {/* Date picker for selecting a due date */}
                     <ReactDatePicker
                        selected={dueDate}
                        onChange={handleDueDateChange}
                        open={showDatePicker}
                     />

                     {/* Button for adding the task */}
                     <div>
                        <MDBBtn onClick={handleAddToDoTask}>Add</MDBBtn>
                     </div>
                  </div>
               </MDBCardBody>
            </MDBCard>
         </div>
      </>
   );
};

export default AddTask;
