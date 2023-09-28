import React, { useState } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBIcon, MDBTooltip } from 'mdb-react-ui-kit';
import ReactDatePicker from 'react-datepicker';

interface Props {
   onAdd(title: string, dueDate?: Date | null): void;
   onMute?(): void;
 }

const AddTask: React.FC<Props> = ({onAdd}: Props) => {
   const [dueDate, setdueDate] = useState<Date | null >(null);
   const [showDatePicker, setShowDatePicker] = useState(false);
   const [title, setTitle] = useState("");
   const handleDueDateChange = (date: Date) => {
      setdueDate(date);
      setShowDatePicker(false);
   };
   const handleAddToDoTask = () =>{
      onAdd(title,dueDate)
      setTitle("")
   }
   return (
      <>
         <div className="pb-2">
            <MDBCard>
               <MDBCardBody>
                  <div className="d-flex flex-row align-items-center">
                     <input
                     onChange={(e)=>setTitle(e.target.value)}
                     value={title}
                        type="text"
                        className="form-control form-control-lg"
                        id="exampleFormControlInput1"
                        placeholder="Add new..."
                     />
                     <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Set due date">
                        <MDBIcon
                           fas
                           icon="calendar-alt"
                           size="lg"
                           className="me-3"
                           onClick={() => setShowDatePicker(!showDatePicker)}
                        />{' '}
                     </MDBTooltip>

                     <ReactDatePicker
                        selected={dueDate}
                        onChange={handleDueDateChange}
                        open={showDatePicker}
                     />
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
