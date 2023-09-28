using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.Application.ToDoTasks.Commands.CreateToDoTask;
using TD.Application.ToDoTasks.Commands.DeleteToDoTask;
using TD.Application.ToDoTasks.Commands.MarkAsDoneToDoTask;
using TD.Application.ToDoTasks.Commands.UpdateToDoTask;
using TD.Application.ToDoTasks.Queries.GetToDoTaskById;
using TD.Application.ToDoTasks.Queries.GetToDoTaskList;
using TD.Web.Controllers.Shared;

namespace TD.Web.Controllers;

public class ToDoTaskController : ToDoBaseController
{
    public ToDoTaskController(IMediator mediator) : base(mediator)
    {
    }

    [HttpGet]
    public async Task<IActionResult> GetById(Guid id)
    {
        var query = new GetToDoTaskByIdQuery(id);
        return Ok(await _mediator.Send(query));
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetAllToDoTasksQuery query)
    {
        return Ok(await _mediator.Send(query));

    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateToDoTaskCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    [HttpPut]
    public async Task<IActionResult> Update(UpdateToDoTaskCommand command)
    {
        return Ok(await _mediator.Send(command));
    }

    [HttpPut]
    public async Task MarkAsDone(MarkAsDoneToDoTaskCommand command)
    {
        await _mediator.Send(command);
    }

    [HttpDelete]
    public async Task Delete([FromQuery] DeleteToDoTaskCommand command)
    {
        await _mediator.Send(command);
    }

}
