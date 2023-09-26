using MediatR;
using TD.Application.ToDoTasks.Commands.UpdateToDoTask;
using TD.Domain.Constants;
using TD.Domain.Exceptions.CustomExceptions;
using TD.Domain.Repositories;

namespace TD.Application.ToDoTasks.Commands.MarkAsDoneToDoTask;

public sealed class MarkAsDoneToDoTaskCommandHandler: IRequestHandler<MarkAsDoneToDoTaskCommand>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;
    public MarkAsDoneToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }

    public async Task Handle(MarkAsDoneToDoTaskCommand request, CancellationToken cancellationToken)
    {
        var toDoTask = await _toDoTaskRepository.GetByIdAsync(request.Id);
        if (toDoTask == null)
        {
            throw new ToDoTaskNotFoundException(message: ValidationMessages.ToDoTaskNotFound);
        }
        toDoTask.MarkAsDone();
        await _toDoTaskRepository.UpdateAsync(toDoTask);
    } 
}
