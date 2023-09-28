import React from 'react';
import {
   MDBCheckbox,
   MDBIcon,
   MDBTooltip,
   MDBTable,
   MDBTableBody,
   MDBTableHead,
   MDBBadge,
} from 'mdb-react-ui-kit';

import { formatDate, isDatePassed } from 'utils/formatting';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
   tasks: ToDoTask[];
   onStatusChange(toDoTask: ToDoTask): void;
   onDelete(id: string): void;
}

const TaskList: React.FC<Props> = ({ tasks, onStatusChange, onDelete }: Props) => {
   const renderTaskTitle = (task: ToDoTask) => {
      if (task.isDone) {
         return (
            <p>
               <s>{task.title}</s>
            </p>
         );
      } else if (isDatePassed(task.dueDate)) {
         return <p className="text-danger">{task.title}</p>;
      } else {
         return <p>{task.title}</p>;
      }
   };
   const renderTaskDueDate = (task: ToDoTask) => {
      if (task.dueDate)
         if (task.isDone) {
            return <p>{formatDate(task.dueDate)}</p>;
         } else if (isDatePassed(task.dueDate)) {
            return <p className="text-danger">{formatDate(task.dueDate)}</p>;
         }
      return '';
   };
   return (
      <>
         <div className="d-flex justify-content-end align-items-center mb-4 pt-2 pb-3">
            <p className="small mb-0 me-2 text-muted">Filter</p>

            <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Ascending">
               <MDBIcon
                  fas
                  icon="sort-amount-down-alt"
                  className="ms-2"
                  style={{ color: '#23af89' }}
               />
            </MDBTooltip>
         </div>
         <Scrollbars style={{ height: 400 }}>
            <MDBTable className="mb-0">
               <MDBTableHead>
                  <tr>
                     <th scope="col"></th>
                     <th scope="col">Task</th>
                     <th scope="col">Due Date</th>
                     <th scope="col">Actions</th>
                  </tr>
               </MDBTableHead>
               <MDBTableBody>
                  {tasks?.map((task) => (
                     <tr className="fw-normal">
                           <th scope="col">
                              <MDBCheckbox
                                 onChange={(e) => onStatusChange(task)}
                                 checked={task.isDone}
                              ></MDBCheckbox>
                           </th>
                        <td className="align-middle">{renderTaskTitle(task)}</td>
                        <td className="align-middle">{renderTaskDueDate(task)}</td>
                        <td className="align-middle">
                           <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Edit todo">
                              <MDBIcon fas icon="pencil-alt" className="me-3" color="info" />
                           </MDBTooltip>
                           <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Remove">
                              <MDBIcon
                                 onClick={() => onDelete(task.id)}
                                 fas
                                 icon="trash-alt"
                                 color="danger"
                                 size="lg"
                                 className="me-3"
                              />
                           </MDBTooltip>
                        </td>
                     </tr>
                  ))}
               </MDBTableBody>
            </MDBTable>{' '}
         </Scrollbars>
      </>
   );
};

export default TaskList;
