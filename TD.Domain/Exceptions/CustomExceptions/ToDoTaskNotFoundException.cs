namespace TD.Domain.Exceptions.CustomExceptions;

public class ToDoTaskNotFoundException: DomainException
{
    public ToDoTaskNotFoundException() : base() { }
    public ToDoTaskNotFoundException(string message) : base(message) { }
    public ToDoTaskNotFoundException(string message, Exception innerException) : base(message, innerException) { }
}
