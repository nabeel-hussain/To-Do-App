using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TD.Domain.Repositories;
using TD.Infrastructure.Repositories;

namespace TD.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<IToDoTaskRepository, ToDoTaskRepository>();
            return services;
        }
        public static IServiceCollection AddDbConext(this IServiceCollection services,IConfiguration configuration)
        {
            services.AddDbContext<ToDoDbContext>(dbContextOptionBuilder =>
            {
                var connectingString = configuration.GetConnectionString("DefaultConnection");
                dbContextOptionBuilder.UseSqlite(connectingString);
            });
            return services;
        }
    }
}
