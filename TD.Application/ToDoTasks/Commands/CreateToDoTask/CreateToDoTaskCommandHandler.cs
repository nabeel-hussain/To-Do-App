using AutoMapper;
using MediatR;
using TD.Domain.Entities;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Commands.CreateToDoTask;

public sealed class CreateToDoTaskCommandHandler : IRequestHandler<CreateToDoTaskCommand, SlimToDoTask>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;
    private readonly IMapper _mapper;

    public CreateToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository,IMapper mapper)
    {
        _toDoTaskRepository = toDoTaskRepository;
        _mapper = mapper;
    }

    public async Task<SlimToDoTask> Handle(CreateToDoTaskCommand request, CancellationToken cancellationToken)
    {
         var toDoTask = ToDoTask.CreateNewToDoTask(title: request.Title,description: request.Description, dueDate: request.DueDate);
        await _toDoTaskRepository.AddAsync(toDoTask);
        var response = _mapper.Map<SlimToDoTask>(toDoTask);
        return response;
    }
}
