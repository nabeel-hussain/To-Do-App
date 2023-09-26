
using MediatR;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Queries.GetToDoTaskList;

public sealed record GetAllToDoTasksQuery(
   ): IRequest<IEnumerable<SlimToDoTask>>;
