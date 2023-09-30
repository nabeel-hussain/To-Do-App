using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace TD.Web.CustomMiddlewares.Authentication;

public class ApiKeyAuthenticationHandler : AuthenticationHandler<ApiKeyAuthenticationOptions>
{
    private readonly IConfiguration _configuration;

    public ApiKeyAuthenticationHandler(IOptionsMonitor<ApiKeyAuthenticationOptions> options, ILoggerFactory logger, UrlEncoder encoder, ISystemClock clock, IConfiguration configuration) : base(options, logger, encoder, clock)
    {
        _configuration = configuration;
    }

    protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
    {
        if (!Request.Headers.TryGetValue(ApiKeyAuthenticationOptions.HeaderName, out var apiKeys) || apiKeys.Count != 1)
        {
            Logger.LogWarning($"An API request was received without the {ApiKeyAuthenticationOptions.HeaderName} header");
            return AuthenticateResult.Fail("Invalid parameters");
        }
        var apiKey = apiKeys.First();

        if (!_configuration.GetValue<string>("ApiKey")?.Equals(apiKey) ?? true)
        {
            Logger.LogWarning("An API request was received with an invalid API key: {apiKey}", apiKey);
            return AuthenticateResult.Fail("Invalid parameters");
        }

        Logger.LogInformation("Client authenticated");

        var claims = new[] { new Claim(ClaimTypes.Name, apiKey) };
        var identity = new ClaimsIdentity(claims, ApiKeyAuthenticationOptions.DefaultScheme);
        var identities = new List<ClaimsIdentity> { identity };
        var principal = new ClaimsPrincipal(identities);
        var ticket = new AuthenticationTicket(principal, ApiKeyAuthenticationOptions.DefaultScheme);
        return AuthenticateResult.Success(ticket);
    }
}
