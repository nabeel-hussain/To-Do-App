using MediatR;
using TD.Domain.Constants;
using TD.Domain.Exceptions.CustomExceptions;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Commands.UpdateToDoTask;

public sealed class UpdateToDoTaskCommandHandler : IRequestHandler<UpdateToDoTaskCommand, SlimToDoTask>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;

    public UpdateToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }

    public async Task<SlimToDoTask> Handle(UpdateToDoTaskCommand request, CancellationToken cancellationToken)
    {
        var toDoTask = await _toDoTaskRepository.GetByIdAsync(request.Id);
        if(toDoTask == null)
        {
            throw new ToDoTaskNotFoundException(message: ValidationMessages.ToDoTaskNotFound);
        }
        toDoTask.Update(title: request.Title,description: request.Description,dueDate: request.DueDate);
        await _toDoTaskRepository.UpdateAsync(toDoTask);
        var response = new SlimToDoTask(toDoTask.Id,toDoTask.Title,toDoTask.Description, toDoTask.IsDone,toDoTask.DueDate);
        return response;
    }
}
