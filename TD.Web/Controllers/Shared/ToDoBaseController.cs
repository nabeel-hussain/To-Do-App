using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace TD.Web.Controllers.Shared;

[ApiController]
[Route("api/[controller]/[action]")]
public class ToDoBaseController : ControllerBase
{
    protected IMediator _mediator;
    public ToDoBaseController(IMediator mediator)
    {
        _mediator = mediator;
    }

    //protected IMediator Mediator => _mediator ??= HttpContext.RequestServices.GetService<IMediator>();
}
