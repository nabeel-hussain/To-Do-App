using MediatR;
using TD.Domain.Entities;
using TD.Domain.Repositories;

namespace TD.Application.ToDoTasks.Commands.CreateToDoTask;

public sealed class CreateToDoTaskCommandHandler : IRequestHandler<CreateToDoTaskCommand, CreateToDoTaskResponse>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;

    public CreateToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository)
    {
        _toDoTaskRepository = toDoTaskRepository;
    }

    public async Task<CreateToDoTaskResponse> Handle(CreateToDoTaskCommand request, CancellationToken cancellationToken)
    {
         var toDoTask = ToDoTask.CreateNewToDoTask(title: request.Title,description: request.Description, dueDate: request.DueDate);
        await _toDoTaskRepository.AddAsync(toDoTask);
        var response = new CreateToDoTaskResponse(toDoTask.Id,toDoTask.Title,toDoTask.Description,toDoTask.DueDate,toDoTask.IsDone);
        return response;
    }
}
