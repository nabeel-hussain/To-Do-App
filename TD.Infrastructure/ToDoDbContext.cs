using Microsoft.EntityFrameworkCore;

namespace TD.Infrastructure;

public sealed class ToDoDbContext : DbContext
{
    public ToDoDbContext(DbContextOptions options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ToDoDbContext).Assembly);
    }
}
