using TD.Domain.Primitives;

namespace TD.Domain.Entities;

public sealed class ToDoTask : IEntity, IDeletable
{
    public Guid Id { get; }
    public string Title { get; private set; }
    public string? Description { get; private set; }
    public bool IsDone { get; private set; }
    public DateTimeOffset? Deleted { get; set; }
    public DateTimeOffset? DueDate { get; private set; }
    public DateTimeOffset? CreationDate { get; set; }
    public DateTimeOffset? ModificationDate { get; set; }
    public ToDoTask() { }

    public ToDoTask(Guid id, string title, string description, DateTimeOffset? dueDate)
    {
        Id = id;
        Title = title;
        Description = description;
        DueDate = dueDate;
        IsDone = false;
    }
    public static ToDoTask CreateNewToDoTask(string title, string description, DateTimeOffset? dueDate)
    {
        var toDoTask = new ToDoTask(id: Guid.NewGuid(), title: title, description: description, dueDate: dueDate);
        return toDoTask;
    }

    public void Update(string title, string description, DateTimeOffset? dueDate)
    {
        Title = title;
        Description = description;
        DueDate = dueDate;
    }
    public void MarkAsDone()
    {
        IsDone = true;
    }
    public void MarkAsUnDone()
    {
        IsDone = false;
    }
    public void MarkAsDeleted()
    {
        Deleted = DateTimeOffset.Now;
    }

}
