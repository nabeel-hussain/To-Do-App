using FluentValidation;
using MediatR;
using TD.Domain.Exceptions;

namespace TD.Application.Behaviours;

public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
                                                             where TRequest : IRequest<TResponse>
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;

    public ValidationBehaviour(IEnumerable<IValidator<TRequest>> validators)
    {
        _validators = validators;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        var context = new ValidationContext<TRequest>(request);
        var failures = _validators
            .Select(v => v.Validate(context))
            .SelectMany(result => result.Errors)
            .Select(v => v.ErrorMessage)
            .Where(f => f != null)
            .ToList();

        if (failures.Any())
        {
            throw new InvalidRequestException(failures);
        }

        return await next();
    }
}


