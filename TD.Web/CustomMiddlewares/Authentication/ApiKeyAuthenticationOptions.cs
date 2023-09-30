using Microsoft.AspNetCore.Authentication;

namespace TD.Web.CustomMiddlewares.Authentication;

public class ApiKeyAuthenticationOptions : AuthenticationSchemeOptions
{
    public const string DefaultScheme = "ClientKey";
    public const string HeaderName = "x-api-key";
}
