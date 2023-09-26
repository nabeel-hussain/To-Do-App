using Microsoft.EntityFrameworkCore;
using TD.Domain.Entities;

namespace TD.Infrastructure;

public sealed class ToDoDbContext : DbContext
{
    public DbSet<ToDoTask> ToDoTasks { get; set; }

    public ToDoDbContext(DbContextOptions options) : base(options)
    {

    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(ToDoDbContext).Assembly);
    }
}
