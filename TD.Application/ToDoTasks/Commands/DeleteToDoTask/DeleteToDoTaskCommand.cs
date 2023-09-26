using MediatR;

namespace TD.Application.ToDoTasks.Commands.DeleteToDoTask;

public sealed record DeleteToDoTaskCommand(Guid Id): IRequest;
