using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using Load.Tests.Helpers;
using NBomber.CSharp;
using NBomber.Contracts;
using NBomber.Http.CSharp;

namespace Load.Tests.Helpers;

public record AuthRes
{
    [JsonPropertyName("token")]
    public string TokenJWT { get; set; } = "";
}

//"unique_name": "employee1",
//"nameid": "1f8ea226-8f90-4de8-ad67-2211a9849196",
//"role": "Employee",

public record UserJWT
{
    [JsonPropertyName("nameid")]
    public Guid? Id { get; set; }
    [JsonPropertyName("unique_name")]
    public string? Name { get; set; }
    [JsonPropertyName("role")]
    public string? Role { get; set; }
}

public class LoginStepHelper
{
    public static async Task<Response<AuthRes>> Login(HttpClient client, string username, string password)
    {
        Uri baseurl = new("http://localhost:5000");
        string endpoint = "/api/Auth/login";
        Uri fullurl = new(baseurl, endpoint);

        var user = new
        {
            username,
            password
        };

        var data = JsonSerializer.Serialize(user);
        var req = Http.CreateRequest("POST", fullurl.ToString())
            .WithHeader("Accept", "application/json")
            .WithBody(new StringContent(data, Encoding.UTF8, "application/json"));

        var res = await Http.Send(client, req);

        if (res.IsError) return Response.Fail(payload: new AuthRes(), message: res.Message);
        if (res.StatusCode != "OK") return Response.Fail(payload: new AuthRes(), message: $"Status code was {res.StatusCode}");

        AuthRes? auth = JsonSerializer.Deserialize<AuthRes>(await res.Payload.Value.Content.ReadAsStringAsync());
        if (auth is null || string.IsNullOrEmpty(auth.TokenJWT))
            return Response.Fail(payload: new AuthRes(), message: "JSON parsing of Auth object failed");

        UserJWT? userInfos = JWTDecoder.Decode<UserJWT>(auth.TokenJWT);
        if (userInfos is null)
            return Response.Fail(payload: auth, message: "JWT decoding failed");

        return Response.Ok(payload: auth, statusCode: res.StatusCode, sizeBytes: res.SizeBytes);
    }
}
