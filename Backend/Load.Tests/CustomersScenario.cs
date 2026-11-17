using NBomber.CSharp;
using NBomber.Http.CSharp;
using Shouldly;

namespace Load.Tests;

// devin
public class CustomersScenario
{
    [Fact]
    public static void Exec()
    {
        var scenario = Scenario.Create("Lister les clients", async context =>
        {
            var response = await Step.Run("GET /api/Customers", context, async () =>
            {
                Uri fullurl = new(new Uri("http://localhost:5000"), "/api/Customers");

                var req = Http.CreateRequest("GET", fullurl.ToString())
                    .WithHeader("Accept", "application/json");

                var res = await Http.Send(Http.CreateDefaultClient(), req);

                if (res.IsError) return Response.Fail(statusCode: res.StatusCode, message: res.Message);
                if (res.StatusCode != "OK") return Response.Fail(statusCode: res.StatusCode, message: $"Status code was {res.StatusCode}");

                return Response.Ok(statusCode: res.StatusCode, sizeBytes: res.SizeBytes);
            });

            await Task.Delay(TimeSpan.FromSeconds(1));
            return response;
        })
            .WithoutWarmUp()
            .WithLoadSimulations(
                Simulation.KeepConstant(2, TimeSpan.FromSeconds(10))
            );

        var stats = NBomberRunner
            .RegisterScenarios(scenario)
            .Run();

        var step = stats.ScenarioStats[0];
        step.Fail.Request.Count.ShouldBe(0);
    }
}
