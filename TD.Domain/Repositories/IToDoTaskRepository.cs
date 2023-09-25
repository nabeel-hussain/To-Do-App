using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.Domain.Entities;

namespace TD.Domain.Repositories
{
    public interface IToDoTaskRepository
    {
        void Add(ToDoTask toDoTask);
        void Update(ToDoTask toDoTask);
        Task<ToDoTask> GetByIdAsync(Guid id);
    }
}
