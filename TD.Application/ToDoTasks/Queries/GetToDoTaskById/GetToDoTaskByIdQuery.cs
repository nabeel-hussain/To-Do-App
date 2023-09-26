using MediatR;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Queries.GetToDoTaskById;

public sealed record GetToDoTaskByIdQuery(Guid Id): IRequest<SlimToDoTask>;