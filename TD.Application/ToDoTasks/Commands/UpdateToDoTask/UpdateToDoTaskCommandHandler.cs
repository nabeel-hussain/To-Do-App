using AutoMapper;
using MediatR;
using TD.Domain.Constants;
using TD.Domain.Exceptions.CustomExceptions;
using TD.Domain.Repositories;
using TD.Domain.SlimEntities;

namespace TD.Application.ToDoTasks.Commands.UpdateToDoTask;

public sealed class UpdateToDoTaskCommandHandler : IRequestHandler<UpdateToDoTaskCommand, SlimToDoTask>
{
    private readonly IToDoTaskRepository _toDoTaskRepository;
    private readonly IMapper _mapper;

    public UpdateToDoTaskCommandHandler(IToDoTaskRepository toDoTaskRepository, IMapper mapper)
    {
        _toDoTaskRepository = toDoTaskRepository;
        _mapper = mapper;
    }

    public async Task<SlimToDoTask> Handle(UpdateToDoTaskCommand request, CancellationToken cancellationToken)
    {
        var toDoTask = await _toDoTaskRepository.GetByIdAsync(request.Id);
        if(toDoTask == null)
        {
            throw new ToDoTaskNotFoundException(message: ValidationMessages.ToDoTaskNotFound);
        }
        toDoTask.Update(title: request.Title,description: request.Description,dueDate: request.DueDate);
        if(request.isDone==true)
        {
            toDoTask.MarkAsDone();
        }
        else
        {
            toDoTask.MarkAsUnDone();
        }
        await _toDoTaskRepository.UpdateAsync(toDoTask);
        var response = _mapper.Map<SlimToDoTask>(toDoTask);
        return response;
    }
}
