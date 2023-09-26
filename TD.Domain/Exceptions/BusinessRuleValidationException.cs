
namespace TD.Domain.Exceptions
{
    public class BusinessRuleValidationException : Exception
    {
        public List<string> Errors { get; }

        public BusinessRuleValidationException(List<string> errors)
        {
            Errors = errors;
        }

        public BusinessRuleValidationException(string error)
        {
            Errors = new List<string> { error };
        }
    }
}
