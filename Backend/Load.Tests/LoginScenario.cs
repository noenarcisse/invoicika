using System.Text.Json;
using NBomber.CSharp;
using NBomber.Http.CSharp;
using System.Text;
using System.Text.Json.Serialization;
using Load.Tests.Helpers;
using Shouldly;

namespace Load.Tests;

public record AuthRes
{
    [JsonPropertyName("token")]
    public string TokenJWT { get; set; } = "";
}

//"unique_name": "Jacques Houille",
//"nameid": "1f8ea226-8f90-4de8-ad67-2211a9849196",
//"role": "Employee",
//"nbf": 1792841520,
//"exp": 1793446320,
//"iat": 1792841520,
//"iss": "YourIssuer",
//"aud": "YourAudience"

public record UserJWT
{
    [JsonPropertyName("nameid")]
    public Guid? Id { get; set; }
    [JsonPropertyName("unique_name")]
    public string? Name { get; set; }
    [JsonPropertyName("role")]
    public string? Role { get; set; }

};

public class LoginScenario
{
    [Fact]
    public static void Exec()
    {
        var scenario = Scenario.Create("Se connecter", async context =>
        {
            Uri baseurl = new("http://localhost:5000");
            string endpoint = "/api/Auth/login";

            Uri fullurl = new(baseurl, endpoint);

            Console.WriteLine(fullurl.ToString());

            var user = new
            {
                username = "Jacques Houille",
                password = "cestokay"
            };

            var data = JsonSerializer.Serialize(user);
            var req = Http.CreateRequest("POST", fullurl.ToString())
                .WithHeader("Accept", "application/json")
                .WithBody(new StringContent(data, Encoding.UTF8, "application/json"));

            var res = await Http.Send(Http.CreateDefaultClient(), req);

            res.IsError.ShouldBeFalse("Response was an error");
            res.StatusCode.ShouldBe("OK", $"Status code was not OK but {res.StatusCode}");


            Console.WriteLine(res.Payload.Value.Content.ReadAsStringAsync());
            AuthRes auth = JsonSerializer.Deserialize<AuthRes>(await res.Payload.Value.Content.ReadAsStringAsync())
                                ?? throw new JsonException("The payload couldn't be parsed");

            Console.WriteLine(auth.TokenJWT);

            UserJWT? userInfos = JWTDecoder.Decode<UserJWT>(auth.TokenJWT);
            if (userInfos is null) Console.WriteLine("UserInfo is null");

            Console.WriteLine(userInfos?.Name);

            //erreur dans la doc, le statusCode c'est "OK", "NotFound" etc a la aspnet
            //le statusCode dans le Payload c'est bien le vrai code
            //Assert.Equal("200", res.StatusCode);

            Console.WriteLine(res.StatusCode);
            Console.WriteLine(res.Payload);
            Console.WriteLine(res.SizeBytes);

            if (res.StatusCode == "OK")
                return Response.Ok(statusCode: res.StatusCode);
            return Response.Fail(statusCode: res.StatusCode);

        })
            .WithoutWarmUp().
            WithLoadSimulations(
                Simulation.Inject(
                    rate: 1,
                    interval: TimeSpan.FromSeconds(1),
                    during: TimeSpan.FromMinutes(1)
                    )
            );

        var stats = NBomberRunner
            .RegisterScenarios(scenario)
            .Run();

        var step = stats.ScenarioStats[0];
        Assert.Equal(0, step.Fail.Request.Count);
    }
}
