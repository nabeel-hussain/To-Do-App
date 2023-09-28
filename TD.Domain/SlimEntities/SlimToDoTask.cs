namespace TD.Domain.SlimEntities;

public sealed record SlimToDoTask(
    Guid Id,
    string Title,
    DateTimeOffset CreationDate,
    bool IsDone,
    DateTimeOffset? DueDate);
