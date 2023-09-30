using AutoMapper;
using MediatR;
using TD.Domain.Constants;
using TD.Domain.Exceptions.CustomExceptions;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Queries.GetToDoTaskById;

internal sealed class GetToDoTaskByIdQueryHandler : IRequestHandler<GetToDoTaskByIdQuery, SlimToDoTask>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;
    private readonly IMapper _mapper;

    public GetToDoTaskByIdQueryHandler(IToDoTaskRepository toDoTaskRepository,IMapper mapper)
    {
        _toDoTaskRepository = toDoTaskRepository;
        _mapper = mapper;
    }
    public async Task<SlimToDoTask> Handle(GetToDoTaskByIdQuery request, CancellationToken cancellationToken)
    {
        var toDoTask = await _toDoTaskRepository.GetByIdAsync(request.Id);
        if (toDoTask == null)
        {
            throw new ToDoTaskNotFoundException(message: ValidationMessages.ToDoTaskNotFound);
        }
        var response = _mapper.Map<SlimToDoTask>(toDoTask);
        return response;
    }
}
