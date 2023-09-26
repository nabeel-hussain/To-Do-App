using MediatR;

namespace TD.Application.ToDoTasks.Commands.MarkAsDoneToDoTask;

public sealed record MarkAsDoneToDoTaskCommand(Guid Id): IRequest;
