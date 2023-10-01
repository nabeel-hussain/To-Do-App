import React from 'react';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { formatDate, getCurrentDate, isDatePassed, stringToDate } from 'utils/formatting';
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
   type GridFilterModel,
} from '@mui/x-data-grid';
import classes from 'components/ToDoTask/TaskList/TaskList.module.scss';
import { Box, Grid, Tab, Tabs } from '@mui/material';
import { countPendingTasks } from 'utils/utility';
interface Props {
   tasks: ToDoTask[];
   onStatusChange: (toDoTask: ToDoTask) => Promise<void>;
   onUpdate: (toDoTask: ToDoTask) => Promise<void>;
   onDelete: (id: string) => Promise<void>;
}

const TaskList: React.FC<Props> = ({ tasks, onStatusChange, onDelete, onUpdate }: Props) => {
   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
   const apiRef = useGridApiRef();
   const [selectedTab, setSelectedTab] = React.useState(0);
   const [filterModel, setFilterModel] = React.useState<GridFilterModel>({ items: [] });
   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   const handleEditClick = (id: GridRowId) => (): void => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   const handleSaveClick = (task: ToDoTask): void => {
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
         flex: 1,
         editable: true,
         hideable:false
      },

      {
         field: 'dueDate',
         headerName: 'Due Date',
         type: 'date',
         flex: 1,
         editable: true,
         valueGetter: (params) => {
            return stringToDate(params.value);
         },
         renderCell: (params) => <>{formatDate(params.value)}</>,
      },
      {
         field: 'isDone',
         headerName: 'Status',
         flex: 1,
         editable: true,
         type: 'boolean',
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
   const handleTabChange = (event: React.SyntheticEvent, newValue: number) : void=> {
      setSelectedTab(newValue);
      let filterModel: GridFilterModel = { items: [] };
      if (newValue === 1 || newValue === 2) {
         filterModel = {
            items: [
               { id: 1, field: 'isDone', operator: 'is', value: newValue === 1 ? 'false' : 'true' },
            ],
         };
      } else if (newValue === 3) {
         filterModel = {
            items: [{ id: 1, field: 'dueDate', operator: 'before', value: getCurrentDate() }],
         };
      }
      setFilterModel(filterModel);
   };
   const CustomFooter = () : React.ReactElement=> {
      return (
         <Grid className={classes.gridStyle} item xs={12}>
            <p>
               {' '}
               <b>Total:</b> {tasks.length} <b>Pending</b>: {countPendingTasks(tasks)}
            </p>
         </Grid>
      );
   };
   const handleNewFilter = (newFilter: GridFilterModel) :void=> {
      setFilterModel(newFilter);
   };
   return (
      <>
         <Box className={classes.customBox}>
            <Tabs
               value={selectedTab}
               onChange={handleTabChange}
               scrollButtons
               aria-label="visible arrows tabs example"
            >
               <Tab label="All" />
               <Tab label="Pending" />
               <Tab label="Completed" />
               <Tab label="Overdue" />
            </Tabs>
            <br></br>
            <DataGrid
               slots={{
                  footer: CustomFooter,
               }}
               initialState={{
                  columns: {
                     columnVisibilityModel: {
                        isDone: false,
                     },
                  },
               }}
               filterModel={filterModel}
               onFilterModelChange={(newFilterModel) => { handleNewFilter(newFilterModel); }}
               apiRef={apiRef}
               hideFooterPagination={true}
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
         </Box>
      </>
   );
};

export default TaskList;
