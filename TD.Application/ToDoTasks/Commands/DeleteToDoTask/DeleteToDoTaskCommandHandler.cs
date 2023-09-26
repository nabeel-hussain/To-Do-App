
using MediatR;
using TD.Domain.Constants;
using TD.Domain.Exceptions.CustomExceptions;
using TD.Domain.Repositories;

namespace TD.Application.ToDoTasks.Commands.DeleteToDoTask;

public sealed class DeleteToDoTaskCommandHandler: IRequestHandler<DeleteToDoTaskCommand>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;
    public DeleteToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }

    public async Task Handle(DeleteToDoTaskCommand request, CancellationToken cancellationToken)
    {
        var toDoTask = await _toDoTaskRepository.GetByIdAsync(request.Id);
        if (toDoTask == null)
        {
            throw new ToDoTaskNotFoundException(message: ValidationMessages.ToDoTaskNotFound);
        }
        toDoTask.MarkAsDeleted();
        await _toDoTaskRepository.UpdateAsync(toDoTask);
    } 
}
