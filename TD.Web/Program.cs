using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using TD.Application;
using TD.Infrastructure;
using TD.Web.CustomMiddlewares;
using TD.Web.CustomMiddlewares.Authentication;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRepositories();
builder.Services.AddDbConext(builder.Configuration);
builder.Services.AddApplicationServices();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//Adding Swagger to the UI
builder.Services.AddSwaggerGen(cfg =>
{
    cfg.SwaggerDoc("v1", new OpenApiInfo { Title = "ToDo API", Version = "v1" });
    // Define security definition for API Key authentication. 
    cfg.AddSecurityDefinition(ApiKeyAuthenticationOptions.DefaultScheme, new OpenApiSecurityScheme
    {
        Name = ApiKeyAuthenticationOptions.HeaderName,
        Description = "Enter your API Key",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });
    // Define security requirement for API Key authentication.
    cfg.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = ApiKeyAuthenticationOptions.DefaultScheme
                }
            },
            Array.Empty<string>()
        }
    });
});
// Configure API Key authentication.
builder.Services.AddAuthentication(ApiKeyAuthenticationOptions.DefaultScheme)
    .AddScheme<ApiKeyAuthenticationOptions, ApiKeyAuthenticationHandler>(ApiKeyAuthenticationOptions.DefaultScheme, null);

var app = builder.Build();

app.UseCors(builder =>
            builder
            .WithOrigins("*")
            .AllowAnyMethod()
            .AllowAnyHeader());

// Enable Swagger UI for API documentation.
app.UseSwagger();
app.UseSwaggerUI();

using (var serviceScope = app.Services.CreateScope())
{
    // Apply database migrations during application startup.
    var db = serviceScope.ServiceProvider.GetRequiredService<ToDoDbContext>();
    db.Database.Migrate();
}

//Registering Middleware to handle global errors
app.UseMiddleware<ErrorHandlerMiddleware>(app.Environment);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers()
    .RequireAuthorization();
app.Run();
