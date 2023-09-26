using MediatR;
using Microsoft.AspNetCore.Mvc;
using TD.Application.ToDoTasks.Commands.CreateToDoTask;
using TD.Web.Controllers.Shared;

namespace TD.Web.Controllers;

public class ToDoTaskController : ToDoBaseController
{
    public ToDoTaskController(IMediator mediator) : base(mediator)
    {
    }

    [HttpGet]
    public void GetToDoTaskById()
    {
        
    }

    [HttpGet]
    public void GetToDoTaskList()
    {

    }

    [HttpPost]
    public async Task<IActionResult> CreateToDoTask(CreateToDoTaskCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    [HttpPut]
    public void UpdateToDoTask()
    {

    }

    [HttpPut]
    public void MarkAsDoneToDoTask()
    {

    }

    [HttpDelete]
    public void DeleteToDoTask()
    {

    }

}
