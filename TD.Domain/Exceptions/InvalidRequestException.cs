
namespace TD.Domain.Exceptions;

public class InvalidRequestException : Exception
{
    public List<string> Errors { get; }

    public InvalidRequestException(List<string> errors)
    {
        Errors = errors;
    }

    public InvalidRequestException(string error)
    {
        Errors = new List<string>() { error };
    }
}
