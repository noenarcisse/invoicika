using Load.Tests.Helpers;
using NBomber.CSharp;
using NBomber.Http.CSharp;
using Shouldly;

namespace Load.Tests;

public class LoginScenario
{
    [Fact]
    public static void Exec()
    {
        var client = Http.CreateDefaultClient();

        var scenario = Scenario.Create("Se connecter et lister les items", async context =>
        {
            var loginStep = await Step.Run("Login en cours", context, () =>
                LoginStepHelper.Login(client, "Jacques Houille", "cestokay"));

            var token = loginStep.Payload.Value.TokenJWT;
            context.Logger.Information(token);

            var listItemsStep = await Step.Run("GET /api/Items", context, async () =>
            {
                Uri fullurl = new(new Uri("http://localhost:5000"), "/api/Items");

                var req = Http.CreateRequest("GET", fullurl.ToString())
                    .WithHeader("Accept", "application/json")
                    .WithHeader("Authorization", $"Bearer {token}");

                var res = await Http.Send(client, req);

                if (res.IsError) return Response.Fail(statusCode: res.StatusCode, message: res.Message);
                if (res.StatusCode != "OK") return Response.Fail(statusCode: res.StatusCode, message: $"Status code was {res.StatusCode}");

                return Response.Ok(statusCode: res.StatusCode, message: "Items retrieved", sizeBytes: res.SizeBytes);
            });

            return listItemsStep;
        })
            .WithoutWarmUp()
            .WithLoadSimulations(
                Simulation.Inject(
                    rate: 1,
                    interval: TimeSpan.FromSeconds(1),
                    during: TimeSpan.FromSeconds(30)
                    )
            );

        var stats = NBomberRunner
            .RegisterScenarios(scenario)
            .Run();

        var step = stats.ScenarioStats[0];
        step.Fail.Request.Count.ShouldBe(0);
    }
}
