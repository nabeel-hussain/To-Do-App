
namespace TD.Application.ToDoTasks.Commands.CreateToDoTask;

public sealed record CreateToDoTaskResponse(Guid Id, string Title, string Description,DateTimeOffset DueDate,bool IsDone);
