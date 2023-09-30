using FluentValidation;
using TD.Domain.Constants;

namespace TD.Application.ToDoTasks.Commands.UpdateToDoTask;
public class UpdateToDoTaskCommandValidator : AbstractValidator<UpdateToDoTaskCommand>
{
    public UpdateToDoTaskCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MinimumLength(ValidationConstants.MinimumToDoTaskTitleLength).WithMessage(ValidationMessages.MinimumToDoTaskLengthRequired);
    }
}