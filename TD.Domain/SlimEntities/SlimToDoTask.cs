namespace TD.Domain.SlimEntities;

public sealed record SlimToDoTask(
    Guid Id,
    string Title,
    string Description,
    bool IsDone,
    DateTimeOffset DueDate);
