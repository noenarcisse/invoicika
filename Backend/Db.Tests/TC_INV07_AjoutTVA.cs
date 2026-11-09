using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

[Collection("db")]
public class TC_INV07_AjoutTVA(PostgresFixture db)
{

    [Fact]
    public async Task TC_INV07_003_AjoutDeTVA_DoublonTVA_Rejete()
    {
        await using var ctx = db.CreateContext();

        decimal tvaValue = 22;

        ctx.VATs.Add(new VAT
        {
            VatId = Guid.NewGuid(),
            Percentage = tvaValue,
            CreationDate = DateTime.UtcNow
        });
        ctx.VATs.Add(new VAT
        {
            VatId = Guid.NewGuid(),
            Percentage = tvaValue,
            CreationDate = DateTime.UtcNow,
        });

        var e = await Should.ThrowAsync<Microsoft.EntityFrameworkCore.DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception"
        );

        e.InnerException.ShouldBeOfType<PostgresException>()
            .SqlState.ShouldBe(
                PostgresErrorCodes.UniqueViolation, 
                "Erreur, pas de clause UNIQUE sur le VAT Percentage"
            );
    }
}
