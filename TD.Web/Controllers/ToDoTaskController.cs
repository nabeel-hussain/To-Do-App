using Microsoft.AspNetCore.Mvc;

namespace TD.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    public class ToDoTaskController : ControllerBase
    {
        [HttpGet]
        public Task<string> Index()
        {
            return Task.FromResult("test");
        }
    }
}
