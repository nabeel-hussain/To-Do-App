namespace TD.Domain.Primitives;

public interface IDeletable
{
    public DateTimeOffset? Deleted { get; set; }
}
