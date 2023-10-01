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
   GridLogicOperator,
} from '@mui/x-data-grid';
import classes from 'components/ToDoTask/TaskList/TaskList.module.scss';
import { Backdrop, Box, CircularProgress, Grid, Tab, Tabs } from '@mui/material';
import { countPendingTasks } from 'utils/utility';

// Define the Props interface for the TaskList component
interface Props {
   tasks: ToDoTask[]; // An array of ToDoTask objects
   onStatusChange: (toDoTask: ToDoTask) => Promise<void>; // Function to handle mark as done/undone functionality.
   onUpdate: (toDoTask: ToDoTask) => Promise<void>; // Function to handle task updates
   onDelete: (id: string) => Promise<void>; // Function to handle task deletion
   loading?: boolean; // Flag to indicate api call in progress.
}

const TaskList: React.FC<Props> = ({
   tasks,
   onStatusChange,
   onDelete,
   onUpdate,
   loading,
}: Props) => {
   // State to manage row modes (edit/view)
   const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

   // Reference to the DataGrid API
   const apiRef = useGridApiRef();

   // State to manage the selected tab (All, Pending, Completed and Overdue)
   const [selectedTab, setSelectedTab] = React.useState(0);

   // State to manage the filter model
   const [filterModel, setFilterModel] = React.useState<GridFilterModel>({ items: [] });

   // Handle row edit stop event
   const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
      if (params.reason === GridRowEditStopReasons.rowFocusOut) {
         event.defaultMuiPrevented = true;
      }
   };

   // Handle click event for editing a task
   const handleEditClick = (id: GridRowId) => (): void => {
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
   };

   // Handle click event for saving changes to a task
   const handleSaveClick = (task: ToDoTask): void => {
      setRowModesModel({ ...rowModesModel, [task.id]: { mode: GridRowModes.View } });
   };

   // Handle click event for cancelling changes to a task
   const handleCancelClick = (id: GridRowId) => (): void => {
      setRowModesModel({
         ...rowModesModel,
         [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
   };

   // update the data in the database when user clicks on save button
   const processRowUpdate = async (newRow: ToDoTask): Promise<ToDoTask> => {
      const updatedRow = { ...newRow, isNew: false };
      if (newRow !== null) {
         await onUpdate(newRow);
      }
      return updatedRow;
   };

   // Handle changes in row modes model
   const handleRowModesModelChange = (newRowModesModel: GridRowModesModel): void => {
      setRowModesModel(newRowModesModel);
   };

   // Define the columns for the DataGrid
   const columns: GridColDef[] = [
      // Column for allowing user to mark task as done or undone
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
         hideable: false,
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

   // When the Tab (All, Pending, Completed, Overdue) is clicked, this function will handle the filter process and tab change.
   const handleTabChange = (_event: React.SyntheticEvent, newValue: number): void => {
      // 0 denotes All,
      // 1 denotes Pending,
      // 2 denotes Completed,
      // 3 denotes Overdue tab
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
            items: [
               { id: 1, field: 'dueDate', operator: 'before', value: getCurrentDate() },
               { id: 2, field: 'isDone', operator: 'is', value: 'false' },
            ],
            logicOperator: GridLogicOperator.And,
         };
      }
      setFilterModel(filterModel);
   };

   // Custom footer component to display task statistics like Total and Pending Tasks
   const CustomFooter = (): React.ReactElement => {
      return (
         <Grid className={classes.gridStyle} item xs={12}>
            <p>
               {' '}
               <b>Total:</b> {tasks.length} <b>Pending</b>: {countPendingTasks(tasks)}
            </p>
         </Grid>
      );
   };

   // Handle changes in the filter model
   const handleNewFilter = (newFilter: GridFilterModel): void => {
      setFilterModel(newFilter);
   };

   // Render the TaskList component
   return (
      <>
         <Box className={classes.customBox}>
            <Backdrop
               sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
               open={loading === true ? loading : false}
            >
               <CircularProgress color="inherit" title="Loading...." />
            </Backdrop>
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
               onFilterModelChange={(newFilterModel) => {
                  handleNewFilter(newFilterModel);
               }}
               apiRef={apiRef}
               hideFooterPagination={true}
               rowSelection={false}
               rows={selectedTab === 3 ? tasks.filter((x) => !x.isDone) : tasks}
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
