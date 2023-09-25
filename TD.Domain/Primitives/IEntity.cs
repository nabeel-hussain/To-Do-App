
namespace TD.Domain.Primitives;

public interface IEntity
{
    public Guid Id { get;  }
    public DateTimeOffset? CreationDate { get; set; }
    public DateTimeOffset? ModificationDate { get; set; }
}
