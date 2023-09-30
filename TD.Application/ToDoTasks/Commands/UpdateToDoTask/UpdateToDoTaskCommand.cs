using MediatR;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Commands.UpdateToDoTask;

public sealed record  UpdateToDoTaskCommand(
    Guid Id,
    string Title,
    string? Description,
    bool? isDone,
    DateTimeOffset? DueDate): IRequest<SlimToDoTask>;
