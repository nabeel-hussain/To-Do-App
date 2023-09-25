using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.Domain.Entities;

namespace TD.Infrastructure.Configurations
{
    internal sealed class ToDoTaskConfiguration: IEntityTypeConfiguration<ToDoTask>
    {
        public void Configure(EntityTypeBuilder<ToDoTask> builder)
        {
            builder.ToTable(nameof(ToDoTask));
            builder.HasKey(x => x.Id);
        }
    }
}
