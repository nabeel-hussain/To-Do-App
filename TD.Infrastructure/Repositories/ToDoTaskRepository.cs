using Microsoft.EntityFrameworkCore;
using TD.Domain.Entities;
using TD.Domain.Repositories;

namespace TD.Infrastructure.Repositories;

internal sealed class ToDoTaskRepository : IToDoTaskRepository
{
    private readonly ToDoDbContext _toDoDbContext;
    public ToDoTaskRepository(ToDoDbContext toDoDbContext)
    {
        _toDoDbContext = toDoDbContext;
    }
    public async Task AddAsync(ToDoTask toDoTask)
    {
        await _toDoDbContext.ToDoTasks.AddAsync(toDoTask);
    }

    public async Task<IEnumerable<ToDoTask>> GetAllToDoTasks(Guid id)
    {
        return await _toDoDbContext.ToDoTasks.ToListAsync();
    }

    public async Task<ToDoTask?> GetByIdAsync(Guid id)
    {
        return await _toDoDbContext.ToDoTasks.FirstOrDefaultAsync(x => x.Id == id);
    }

    public void Update(ToDoTask toDoTask)
    {
         _toDoDbContext.Update(toDoTask);
    }
}
