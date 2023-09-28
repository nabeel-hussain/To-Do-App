using AutoMapper;
using MediatR;
using TD.Domain.Entities;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Queries.GetToDoTaskList;

public sealed class GetAllToDoTasksQueryHandler : IRequestHandler<GetAllToDoTasksQuery, IEnumerable<SlimToDoTask>>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;
    private readonly IMapper _mapper;

    public GetAllToDoTasksQueryHandler(IToDoTaskRepository toDoTaskRepository, IMapper mapper)
    {
        _toDoTaskRepository = toDoTaskRepository;
        _mapper = mapper;
    }
    public async Task<IEnumerable<SlimToDoTask>> Handle(GetAllToDoTasksQuery request, CancellationToken cancellationToken)
    {
        var toDoTasks = await _toDoTaskRepository.GetAllToDoTasksAsync();
        var response = _mapper.Map<List<SlimToDoTask>>(toDoTasks);
        return response;
    }
}
