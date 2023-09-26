using MediatR;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Queries.GetToDoTaskList;

public sealed class GetAllToDoTasksQueryHandler : IRequestHandler<GetAllToDoTasksQuery, IEnumerable<SlimToDoTask>>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;

    public GetAllToDoTasksQueryHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }
    public async Task<IEnumerable<SlimToDoTask>> Handle(GetAllToDoTasksQuery request, CancellationToken cancellationToken)
    {
        var toDoTasks = await _toDoTaskRepository.GetAllToDoTasksAsync();
        var slimToDoTasks = toDoTasks.Select(x => new SlimToDoTask (x.Id,  x.Title, x.Description, x.IsDone, x.DueDate )); 
        return slimToDoTasks;
    }
}
