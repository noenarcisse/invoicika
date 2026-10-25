using System.Buffers.Text;
using System.Text.Json;

namespace Load.Tests.Helpers;

public class JWTDecoder
{
    public static T? Decode<T>(string jwt)
    {
        string[] splet = jwt.Split('.');
        string part2 = splet[1];
        //var data = Convert.FromBase64String(part2);
        var data = Base64Url.DecodeFromChars(part2);
        return JsonSerializer.Deserialize<T>(data);
    }
}
