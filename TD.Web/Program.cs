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
builder.Services.AddSwaggerGen(cfg =>
{
    cfg.SwaggerDoc("v1", new OpenApiInfo { Title = "ToDo API", Version = "v1" });
    cfg.AddSecurityDefinition(ApiKeyAuthenticationOptions.DefaultScheme, new OpenApiSecurityScheme
    {
        Name = ApiKeyAuthenticationOptions.HeaderName,
        Description = "Enter your API Key",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey
    });

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

builder.Services.AddAuthentication(ApiKeyAuthenticationOptions.DefaultScheme)
    .AddScheme<ApiKeyAuthenticationOptions, ApiKeyAuthenticationHandler>(ApiKeyAuthenticationOptions.DefaultScheme, null);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseMiddleware<ErrorHandlerMiddleware>(app.Environment);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers()
    .RequireAuthorization();

app.Run();
