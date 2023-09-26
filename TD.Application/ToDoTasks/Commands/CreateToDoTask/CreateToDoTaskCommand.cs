using MediatR;

namespace TD.Application.ToDoTasks.Commands.CreateToDoTask;

public sealed record  CreateToDoTaskCommand(
    string Title,
    string Description, 
    DateTimeOffset DueDate): IRequest<CreateToDoTaskResponse>;
