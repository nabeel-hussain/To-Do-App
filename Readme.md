# To-Do Task Application

## Introduction
This project is a To-Do Task Application built using .NET Core 7, React JS with TypeScript, and MSSQL Server as the database. It allows users to manage their tasks efficiently. Users can easily create tasks, edit tasks, set due date for each task and filter the tasks based on the criteria they like. In this README, a step-by-step guide has created on how to set up and use the To-Do Task Application. Whether you're running it locally for personal use or deploying it in a production environment for a team

## Architecture
The To-Do Task Application boasts a robust and scalable architecture that ensures optimal performance and maintainability. Let's delve into the key architectural components:
### Frontend (ReactJS - nginx server)

The frontend is built using ReactJS with Typescript from vite. To serve these frontend assets efficiently, an nginx server has been utilized on production, which acts as a reverse proxy, handling requests and delivering a seamless user experience. This setup guarantees fast load times and responsiveness.

### Backend (.NET Core 7)

At the core of this To Do Task application lies the .NET Core 7 framework, a versatile and high-performance platform for building web applications. Clean architecture pattern has been implemented in our backend, which promotes separation of concerns and maintainability. One of the notable architectural patterns used is CQRS (Command Query Responsibility Segregation), enabling efficient data retrieval and modification.

### Database (Azure SQL Database)

Data integrity and reliability are paramount in any task management application. To meet these requirements, this project relies on Azure SQL Database, a fully managed and highly scalable relational database service provided by Microsoft Azure. This choice ensures secure storage of task-related data. 

### REST APIs Communicate Between Frontend and Backend Application

To facilitate communication between the frontend and backend, a set of RESTful APIs has been implemented in Backend. These APIs serve as the bridge for data transfer, allowing users to create, read, update, and delete tasks seamlessly.

### API Key-Based Authentication

Security is a top priority for every project. To protect sensitive operations and user data, API key-based authentication has been implemented. 

### Docker Containers

The application components have been containerized using Docker, simplifying deployment and scaling for consistent operation across various environments. Whether running the application locally or deploying it in a production setting, Docker containers ensure consistency and reliability.

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

# Project Setup and Run Guide

This guide will help you set up and run the project with and without Docker.

## With Docker

### Prerequisites
- Install Docker

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
- Install MS SQL Server
- Install Visual Studio 2022
- Install .NET Core 7 SDK
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
### Running in Production
<!-- Explain how to deploy and run the application in a production environment. Mention any additional configurations or considerations. -->

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
- Continuous Integration and Continuous Deployment (CI/CD) is set up using GitHub Actions.
- The application is deployed to Microsoft Azure App Service through Docker Hub.
- To configure CI/CD, refer to the workflows in the `.github/workflows` directory.

## Future Improvements
<!-- Share your plans for future improvements and features you'd like to add to the application. -->

## Contributions
Contributions are welcome! If you'd like to contribute to this project, please follow the [Contributing Guidelines](CONTRIBUTING.md).

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to customize this README to fit your project's specific needs. Good luck with your To-Do Task Application!
