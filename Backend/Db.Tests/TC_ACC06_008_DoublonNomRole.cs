using Microsoft.EntityFrameworkCore;
using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

//devin

// BUG: la colonne Roles.RoleName n'a pas de contrainte UNIQUE en base.
// Ce test verifie que deux roles avec le meme nom sont rejetes.
[Collection("db")]
public class TC_ACC06_008_DoublonNomRole(PostgresFixture db)
{
    [Fact]
    public async Task TC_ACC06_008_AjoutRole_DoublonNom_Rejete()
    {
        await using var ctx = db.CreateContext();

        string roleName = $"Role_{Guid.NewGuid()}";

        ctx.Roles.Add(new Role { RoleName = roleName });
        ctx.Roles.Add(new Role { RoleName = roleName });

        var e = await Should.ThrowAsync<DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception : pas de contrainte UNIQUE sur RoleName"
        );

        e.InnerException.ShouldBeOfType<PostgresException>()
            .SqlState.ShouldBe(
                PostgresErrorCodes.UniqueViolation,
                "Erreur, pas de clause UNIQUE sur RoleName"
            );
    }

    [Fact]
    public async Task TC_ACC06_008_AjoutRole_DoublonNom_CasseDifferente_Rejete()
    {
        await using var ctx = db.CreateContext();

        ctx.Roles.Add(new Role { RoleName = "Admin" });
        ctx.Roles.Add(new Role { RoleName = "admin" });

        var e = await Should.ThrowAsync<DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception : " +
        "RoleName devrait etre unique insensible a la casse"
        );

        e.InnerException.ShouldBeOfType<PostgresException>()
            .SqlState.ShouldBe(
                PostgresErrorCodes.UniqueViolation,
                "Erreur, pas de clause UNIQUE (case-insensitive) sur RoleName"
            );
    }
}
