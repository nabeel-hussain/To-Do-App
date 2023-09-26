using MediatR;
using TD.Domain.Constants;
using TD.Domain.Exceptions.CustomExceptions;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Queries.GetToDoTaskById;

internal sealed class GetToDoTaskByIdQueryHandler : IRequestHandler<GetToDoTaskByIdQuery, SlimToDoTask>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;

    public GetToDoTaskByIdQueryHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }
    public async Task<SlimToDoTask> Handle(GetToDoTaskByIdQuery request, CancellationToken cancellationToken)
    {
        var toDoTask = await _toDoTaskRepository.GetByIdAsync(request.Id);
        if (toDoTask == null)
        {
            throw new ToDoTaskNotFoundException(message: ValidationMessages.ToDoTaskNotFound);
        }
        var response = new SlimToDoTask(toDoTask.Id, toDoTask.Title,toDoTask.Description,toDoTask.IsDone,toDoTask.DueDate);
        return response;
    }
}
