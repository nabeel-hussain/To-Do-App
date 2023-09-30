import React from 'react';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { formatDate, isDatePassed, stringToDate } from 'utils/formatting';
import { Scrollbars } from 'react-custom-scrollbars-2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
   type GridRowModesModel,
   GridRowModes,
   DataGrid,
   type GridColDef,
   GridActionsCellItem,
   type GridEventListener,
   type GridRowId,
   GridRowEditStopReasons,
   useGridApiRef,
} from '@mui/x-data-grid';
import classes from 'components/ToDoTask/TaskList/TaskList.module.scss';
interface Props {
   tasks: ToDoTask[];
   onStatusChange: (toDoTask: ToDoTask) => Promise<void>;
   onUpdate: (toDoTask: ToDoTask) => Promise<void>;
   onDelete: (id: string) => Promise<void>;
}

const TaskList: React.FC<Props> = ({ tasks, onStatusChange, onDelete, onUpdate }: Props) => {
   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
   const apiRef = useGridApiRef();

   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      console.log(params);
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id: GridRowId) => (): void => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   const handleSaveClick = (task: ToDoTask): void => {
      console.log(apiRef);
      setRowModesModel({ ...rowModesModel, [task.id]: { mode: GridRowModes.View } });
   };
   const handleCancelClick = (id: GridRowId) => (): void => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
   };

   const processRowUpdate = async (newRow: ToDoTask): Promise<ToDoTask> => {
      const updatedRow = { ...newRow, isNew: false };
      if (newRow !== null) {
         await onUpdate(newRow);
      }
      return updatedRow;
   };
   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel): void => {
      setRowModesModel(newRowModesModel);
   };
   const columns: GridColDef[] = [
      {
         field: '',
         headerName: '',
         width: 30,
         sortable: false,
         type: 'actions',
         renderCell: (params) => (
            <MDBCheckbox
               onChange={() => {
                  onStatusChange(params.row);
               }}
               checked={params.row.isDone}
            ></MDBCheckbox>
         ),
      },
      {
         field: 'title',
         headerName: 'Task',
         width: 500,
         editable: true,
      },
      {
         field: 'dueDate',
         headerName: 'Due Date',
         type: 'date',
         width: 250,
         editable: true,
         valueGetter: (params) => {
            return stringToDate(params.value);
         },
         renderCell: (params) => <>{formatDate(params.value)}</>,
      },
      {
         field: 'actions',
         type: 'actions',
         headerName: 'Actions',
         width: 100,
         cellClassName: 'actions',
         getActions: ({ id, row }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
               return [
                  <GridActionsCellItem
                     key={1}
                     icon={<SaveIcon />}
                     label="Save"
                     sx={{
                        color: 'primary.main',
                     }}
                     onClick={() => {
                        handleSaveClick(row);
                     }}
                  />,
                  <GridActionsCellItem
                     key={1}
                     icon={<CancelIcon />}
                     label="Cancel"
                     className="textPrimary"
                     onClick={handleCancelClick(id)}
                     color="inherit"
                  />,
               ];
            }

            return [
               <GridActionsCellItem
                  key={1}
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
               />,
               <GridActionsCellItem
                  key={1}
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={() => {
                     onDelete(row.id);
                  }}
                  color="inherit"
               />,
            ];
         },
      },
   ];
   debugger;
   return (
      <>
         <Scrollbars className={classes.scrollBars}>
            <DataGrid
               apiRef={apiRef}
               hideFooter={true}
               rowSelection={false}
               rows={tasks}
               columns={columns}
               editMode="row"
               rowModesModel={rowModesModel}
               onRowModesModelChange={handleRowModesModelChange}
               onRowEditStop={handleRowEditStop}
               processRowUpdate={processRowUpdate}
               getRowClassName={(params) => {
                  if (params.row.isDone) {
                     return classes.doneTask;
                  } else if (isDatePassed(params.row.dueDate)) {
                     return classes.overDueTask;
                  }
                  return '';
               }}
            />
         </Scrollbars>
         {/* <Grid container spacing={22}>
            <Grid item xs={4}>
               <p>{} item(s) left</p>
            </Grid>
            <Grid item xs={8}>
               <p>xs=8</p>
            </Grid>
         </Grid>
         <></> */}
      </>
   );
};

export default TaskList;
