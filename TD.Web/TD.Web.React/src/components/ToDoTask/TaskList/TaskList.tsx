import React from 'react';
import {
   MDBCheckbox,
   MDBIcon,
   MDBTooltip,
   MDBTable,
   MDBTableBody,
   MDBTableHead,
} from 'mdb-react-ui-kit';

import { formatDate } from 'utils/formatting';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface Props {
   tasks: ToDoTask[];
   onStatusChange(toDoTask: ToDoTask): void;
}

const TaskList: React.FC<Props> = ({ tasks, onStatusChange }: Props) => {
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
         <Scrollbars style={{  height: 400 }}>
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
                        <td>
                           <th scope="col">
                              <MDBCheckbox
                                 onChange={(e) => onStatusChange(task)}
                                 checked={task.isDone}
                              ></MDBCheckbox>
                           </th>
                        </td>
                        <td className="align-middle">{task.title}</td>
                        <td className="align-middle">{formatDate(task.creationDate)}</td>
                        <td className="align-middle">
                           <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Edit todo">
                              <MDBIcon fas icon="pencil-alt" className="me-3" color="info" />
                           </MDBTooltip>
                           <MDBTooltip tag="a" wrapperProps={{ href: '#!' }} title="Remove">
                              <MDBIcon
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
