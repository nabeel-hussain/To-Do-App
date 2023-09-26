using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;
using TD.Domain.Exceptions;

namespace TD.Web.CustomMiddlewares;

public class ErrorHandlerMiddleware
{
    private readonly RequestDelegate _next;
    private readonly IWebHostEnvironment _env;

    public ErrorHandlerMiddleware(RequestDelegate next, IWebHostEnvironment env)
    {
        _next = next;
        _env = env;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (InvalidRequestException ex)
        {
            var problemDetails = GetBadRequestProblemDetails(ex);
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.BadRequest;
            await response.WriteAsync(JsonSerializer.Serialize(problemDetails));
        }
        catch (Exception ex)
        {
            var response = context.Response;
            response.ContentType = "application/json";
            response.StatusCode = (int)HttpStatusCode.InternalServerError;
            ProblemDetails problemDetails = GetProblemDetails(ex);

            await response.WriteAsync(JsonSerializer.Serialize(problemDetails));
        }
    }

    private ProblemDetails GetProblemDetails(Exception ex)
    {
        string traceId = Guid.NewGuid().ToString();

        if (_env.EnvironmentName == "Development")
        {
            return new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Type = "https://httpstatuses.com/500",
                Title = ex.Message,
                Detail = ex.ToString(),
                Instance = traceId
            };
        }
        else
        {
            return new ProblemDetails
            {
                Status = (int)HttpStatusCode.InternalServerError,
                Type = "https://httpstatuses.com/500",
                Title = "Something went wrong. Please try after some time",
                Detail = @"We apologize for inconvenience. Please let us know about the error at nabeel.hussain1602@gmail.com. Include traceId: {traceId} in email",
                Instance = traceId
            };
        }
    }

    private InvalidRequestProblemDetails GetBadRequestProblemDetails(InvalidRequestException ex)
    {
        string traceId = Guid.NewGuid().ToString();

        var invalidRequestProblemDetails = new InvalidRequestProblemDetails(ex, traceId);

        return invalidRequestProblemDetails;
    }
    public class InvalidRequestProblemDetails : ProblemDetails
    {
        public List<string> Errors { get; }

        public InvalidRequestProblemDetails(InvalidRequestException exception, string traceId)
        {
            Title = "Request validation error";
            Status = StatusCodes.Status400BadRequest;
            Type = "https://httpstatuses.com/400";
            Errors = exception.Errors;
            Instance = traceId;
        }
    }
}