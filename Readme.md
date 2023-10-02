# To-Do Task Application

## Introduction
This project is a To-Do Task Application built using .NET Core 7, React JS with TypeScript, and MSSQL Server as the database. It allows users to manage their tasks efficiently. Users can easily create tasks, edit tasks, set due date for each task and filter the tasks based on the criteria they like. In this README, a step-by-step guide has created on how to set up and use the To-Do Task Application. Whether you're running it locally for personal use or deploying it in a production environment for a team
## Demo
You can access this application via the following URLs. 
 - Frontend URL: [https://todoapp-vp.azurewebsites.net](https://todoapp-vp.azurewebsites.net/)
  - Backend URL: [https://todoapi-vp.azurewebsites.net](https://todoapi-vp.azurewebsites.net)
  - Swagger Documentation: [https://todoapi-vp.azurewebsites.net/swagger/index.html](https://todoapi-vp.azurewebsites.net/swagger/index.html)
## Architecture
The To-Do Task Application boasts a robust and scalable architecture that ensures optimal performance and maintainability. Let's delve into the key architectural components:
### Frontend (ReactJS - nginx server)

The frontend is built using **ReactJS with Typescript from  [vite](https://vitejs.dev/guide/)**. To serve these frontend assets efficiently, an **nginx** server has been utilized on production, which acts as a reverse proxy, handling requests and delivering a seamless user experience. This setup guarantees fast load times and responsiveness.

### Backend (.NET Core 7)

At the core of this To Do Task application lies the .NET Core 7 framework, a versatile and high-performance platform for building web applications. **Clean architecture** pattern has been implemented in our backend, which promotes separation of concerns and maintainability. One of the notable architectural patterns used is **CQRS** (Command Query Responsibility Segregation), enabling efficient data retrieval and modification.

### Database (Azure SQL Database)

Data integrity and reliability are paramount in any task management application. To meet these requirements, this project relies on **Azure SQL Database**, a fully managed and highly scalable relational database service provided by Microsoft Azure. This choice ensures secure storage of task-related data. 

### REST APIs Communicate Between Frontend and Backend Application

To facilitate communication between the frontend and backend, a set of **RESTful APIs** has been implemented in Backend. These APIs serve as the bridge for data transfer, allowing users to create, read, update, and delete tasks seamlessly.

### API Key-Based Authentication

Security is a top priority for every project. To protect sensitive operations and user data, **API key-based authentication** has been implemented. 

### Docker Containers

The application components have been **containerized using Docker**, simplifying deployment and scaling for consistent operation across various environments. Whether running the application locally or deploying it in a production setting, Docker containers ensure consistency and reliability.

The application's architecture has been meticulously designed to deliver a seamless and efficient task management experience. By combining advanced technologies, clean architectural patterns, and robust security measures, a solid foundation has been created for a reliable and scalable To-Do Task Application.
## Tools and Technologies

### Application and Data
- **.NET Core 7**
- **C#**
- **JavaScript**
- **React**
- **TypeScript**
- **HTML**
- **CSS**
- **Microsoft Azure**
- **Sass**
- **Microsoft SQL Server**

### DevOps
- **Github**
- **Visual Studio 2022**
- **Visual Studio Code**
- **NPM**
- **ESLINT**
- **Docker**
- **Dockerfile**
- **Docker-Compose**
- **Docker Hub**


## Features
- **Add New Task:** Users can add new tasks, which must have more than 10 characters.

- **Edit Task:** Tasks can be edited.

- **Set Due Date:** A due date can be set for each task.

- **Delete Task:** Users can delete tasks.

- **Update Task:** Task details can be updated.

- **Filter Tasks:** Users can filter tasks based on their status, choosing from options such as All, Completed, Pending, Overdue, or any other relevant criteria to quickly access the tasks they need.

- **Show/Hide Columns:** Users can show/hide columns in the tasks table. By default, Task, Duedate, Action columns are visible. User cannot hide Task column but can hide/show all other columns. 

- **Filters on Single Column:** Users can apply filters to a single column.

- **Highlighting Overdue Tasks:** Overdue Tasks are highlighted with user interfactive color.

# Project Setup and Run Guide

This guide will help you set up and run the project with and without Docker.

## With Docker

### Prerequisites
- Docker

### Steps
1. Clone this Repository.
2. Open the terminal.
3. Run the following command to build the Docker containers: `docker-compose build`
4. After the build is complete, run the following command to start the Docker containers: `docker-compose up`
5. Access the applications at the following URLs
    - Frontend URL: [http://localhost:5001](http://localhost:5001)
    - Backend URL: [https://localhost:8001](https://localhost:8001)
    - Swagger Documentation: [https://localhost:8001/swagger/index.html](https://localhost:8001/swagger/index.html)

## Without Docker

### Prerequisites
- MS SQL Server
- Visual Studio 2022
- .NET Core 7 SDK
### Steps

1. Open the Project solution in Visual Studio 2022.
2. Set the `TD.Web` project as the startup project.
3. Update the `appsettings.json` file with your local SQL Server Database configuration.
4. Run the application using the run button in Visual Studio.

5. Open the `TD.Web.React` folder in Visual Studio Code.
6. Update the `.env.local` file with the backend URL (e.g., `VITE_API_BASE_URL=https://localhost:7049`).

7. Install the project dependencies by running the following command in the `TD.Web.React` folder: `npm install`
8. Run the application with the following command: `npm run dev`

9. Access the applications at the following URLs
    - Frontend URL: [http://localhost:5001](http://localhost:5001)
    - Backend URL: [https://localhost:7049](https://localhost:7049)
    - Swagger Documentation: [https://localhost:7049/swagger/index.html](https://localhost:7049/swagger/index.html)

## API Endpoints
### 1. Get ToDo Task by ID

- **Endpoint**: `/api/ToDoTask/GetById`
- **Method**: `GET`
- **Description**: Retrieve a ToDo task by its ID.
- **Parameters**:
  - `id` (query parameter) - The unique identifier of the ToDo task (UUID format).
- **Response**:
  - `200` - Success

### 2. Get All ToDo Tasks

- **Endpoint**: `/api/ToDoTask/Get`
- **Method**: `GET`
- **Description**: Retrieve a list of all ToDo tasks.
- **Parameters**:
- **Response**:
  - `200` - Success

### 3. Create ToDo Task

- **Endpoint**: `/api/ToDoTask/Create`
- **Method**: `POST`
- **Description**: Create a new ToDo task.
- **Request Body**:
  - JSON object with the following properties:
    - `title` (string, nullable) - The title of the ToDo task.
    - `description` (string, nullable) - A description of the ToDo task.
    - `dueDate` (string, date-time format, nullable) - The due date of the ToDo task.
- **Response**:
  - `200` - Success

### 4. Update ToDo Task

- **Endpoint**: `/api/ToDoTask/Update`
- **Method**: `PUT`
- **Description**: Update an existing ToDo task.
- **Request Body**:
  - JSON object with the following properties:
    - `id` (string, UUID format) - The unique identifier of the ToDo task.
    - `title` (string, nullable) - The updated title of the ToDo task.
    - `description` (string, nullable) - The updated description of the ToDo task.
    - `isDone` (boolean, nullable) - Indicates whether the ToDo task is marked as done.
    - `dueDate` (string, date-time format, nullable) - The updated due date of the ToDo task.
- **Response**:
  - `200` - Success

### 5. Mark ToDo Task as Done

- **Endpoint**: `/api/ToDoTask/MarkAsDone`
- **Method**: `PUT`
- **Description**: Mark a ToDo task as done.
- **Request Body**:
  - JSON object with the following property:
    - `id` (string, UUID format) - The unique identifier of the ToDo task to mark as done.
- **Response**:
  - `200` - Success

### 6. Delete ToDo Task

- **Endpoint**: `/api/ToDoTask/Delete`
- **Method**: `DELETE`
- **Description**: Delete a ToDo task by its ID.
- **Parameters**:
  - `Id` (query parameter) - The unique identifier of the ToDo task (UUID format).
- **Response**:
  - `200` - Success

## Deployment Procedure

### Frontend Application Deployment

#### Prerequisites
- An Azure Web App for hosting the frontend application.
- Azure Web App Publish Profile.
- Docker Hub account and credentials for container image registry.

#### GitHub Actions Workflow Trigger
- The deployment workflow will be triggered automatically when changes are pushed to specific directories within the `master` branch:
  - `TD.Web/TD.Web.React/**`
  - `.github/**`
- You can also manually trigger the workflow using the GitHub Actions "workflow_dispatch" event.

#### Deployment Steps

1. **Push Code to Repository**: Ensure that the frontend application code within the specified directories is pushed to the `master` branch in the repository.

2. **GitHub Actions Workflow Execution**: The GitHub Actions workflow for the frontend application includes the following steps:
   - Checking out the code.
   - Setting up Docker Buildx.
   - Logging in to the Docker registry.
   - Building and pushing the container image to Docker Hub using the `Dockerfile.prod`.

3. **Azure Web App Deployment**: After a successful build and push, the container image will be deployed to the Azure Web App specified in the workflow.

### Backend Application Deployment

#### Prerequisites
- An Azure Web App for hosting the backend application.
- Azure Web App Publish Profile.
- Docker Hub account and credentials for container image registry.

#### GitHub Actions Workflow Trigger
- The deployment workflow will be triggered automatically when changes are pushed to any directories within the `master` branch **except**:
  - `TD.Web/TD.Web.React/**`
- You can also manually trigger the workflow using the GitHub Actions "workflow_dispatch" event.

#### Deployment Steps

1. **Push Code to Repository**: Ensure that the backend application code within the specified directories is pushed to the `master` branch in the repository.

2. **GitHub Actions Workflow Execution**: The GitHub Actions workflow for the backend application includes the following steps:
   - Checking out the code.
   - Setting up Docker Buildx.
   - Logging in to the Docker registry.
   - Building and pushing the container image to Docker Hub using `Dockerfile.prod`.

3. **Azure Web App Deployment**: After a successful build and push, the container image will be deployed to the Azure Web App specified in the workflow.

## Future Improvements
Here are some future improvements can be done in this project. 
- **User Management**
- **JWT Authentication**
- **Unit Tests for Frontend and Backend**
- **Supporting Multiple databases e.g SQLITE**
- **UI Improvements**
- **Notification Service**
- **Adding Notes to each Task just like MS ToDo App**


## Contributions

Contributions from the community to improve and enhance this project are welcomed. If you'd like to contribute, please follow these guidelines:

### How to Contribute

1. **Fork the Repository**: Click the "Fork" button on the top-right corner of this repository to create a copy of the project in your GitHub account.

2. **Clone the Repository**: Clone your forked repository to your local machine using the following command:

   ```bash
   git clone https://github.com/nabeel-hussain/To-Do-App.git
3. **Create a Branch:** Create a new branch for your work with a descriptive name.
4. **Make Changes:** Make your desired changes or additions to the codebase.
5. **Commit Changes:** Commit your changes with a clear and concise commit message.
6. **Push Changes:** Push your changes to your forked repository.
7. **Create a Pull Request:** Go to the original repository and click on the `New Pull Request` button. Provide a detailed description of your changes in the pull request.

### Reporting Issues
If you encounter any issues or have suggestions for improvements, please open an issue in the repository. We appreciate your feedback!

Thank you for contributing to our project!

## Contact
If you have any questions or need assistance related to this project, feel free to reach out at [nabeel.hussain1602@gmail.com](mailto:nabeel.hussain1602@gmail.com). I am here to help and would be happy to assist you with any queries.
 


