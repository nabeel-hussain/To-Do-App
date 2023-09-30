using FluentValidation;
using TD.Domain.Constants;

namespace TD.Application.ToDoTasks.Commands.CreateToDoTask;

public class CreateToDoTaskCommandValidator: AbstractValidator<CreateToDoTaskCommand>
{
    public CreateToDoTaskCommandValidator()
    {
        RuleFor(x => x.Title).NotEmpty().MinimumLength(ValidationConstants.MinimumToDoTaskTitleLength).WithMessage(ValidationMessages.MinimumToDoTaskLengthRequired);
    }
}
