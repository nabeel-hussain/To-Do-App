using MediatR;
using TD.Domain.Entities;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Commands.CreateToDoTask;

public sealed class CreateToDoTaskCommandHandler : IRequestHandler<CreateToDoTaskCommand, SlimToDoTask>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;

    public CreateToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }

    public async Task<SlimToDoTask> Handle(CreateToDoTaskCommand request, CancellationToken cancellationToken)
    {
         var toDoTask = ToDoTask.CreateNewToDoTask(title: request.Title,description: request.Description, dueDate: request.DueDate);
        await _toDoTaskRepository.AddAsync(toDoTask);
        var response = new SlimToDoTask(toDoTask.Id,toDoTask.Title,toDoTask.Description, toDoTask.IsDone,toDoTask.DueDate);
        return response;
    }
}
