using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TD.Domain.Entities;

namespace TD.Infrastructure.Configurations;

internal sealed class ToDoTaskConfiguration: IEntityTypeConfiguration<ToDoTask>
{
    public void Configure(EntityTypeBuilder<ToDoTask> builder)
    {
        builder.ToTable(nameof(ToDoTask));
        builder.HasKey(x => x.Id);
    }
}
