using Npgsql;
using Shouldly;
using WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace Db.Tests;

[Collection("db")]
public class TC_PRO01_Produits(PostgresFixture db)
{
    [Fact]
    public async Task TC_PRO01_007_Produits_UserIdNull_Rejete()
    {
        await using var ctx = db.CreateContext();

        // User_id est un Guid non-nullable cote modele : un "null" se traduit
        // par une reference vers un utilisateur inexistant, rejete par la FK.
        ctx.Items.Add(new Item
        {
            ItemId = Guid.NewGuid(),
            Name = $"TestObject_{Guid.NewGuid()}",
            Description = "Nothing to see here",
            PurchasePrice = 1,
            SalePrice = 1,
            Quantity = 1,
            User_id = Guid.NewGuid(),
        });

        var e = await Should.ThrowAsync<DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception de clé étrangère"
        );

        var pge = e.InnerException.ShouldBeOfType<PostgresException>();
        pge.SqlState.ShouldBe(
                PostgresErrorCodes.ForeignKeyViolation,
                $"Rejet pour une autre raison : {pge.SqlState} - {pge.MessageText}"
        );
    }


    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task TC_PRO01_008_Produits_QuantiteInvalide_Rejete(int quantity)
    {
        await using var ctx = db.CreateContext();

        Guid userid = Guid.NewGuid();

        ctx.Users.Add(new User
        {
            UserId = userid,
            Username = $"TestUser_{Guid.NewGuid()}",
            EmailAddress = "test@test.test",
            PasswordHash = "a",
            CreationDate = DateTime.UtcNow,
            Role = new Role { RoleName = $"TestRole_{Guid.NewGuid()}" }
        });

        ctx.Items.Add(new Item
        {
            ItemId = Guid.NewGuid(),
            Name = $"TestObject_{Guid.NewGuid()}",
            Description = "Nothing to see here",
            PurchasePrice = 1,
            SalePrice = 1,
            Quantity = quantity,
            User_id = userid,
        });


        var e = await Should.ThrowAsync<DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception de clause CHECK"
        );

        var pge = e.InnerException.ShouldBeOfType<PostgresException>();
        pge.SqlState.ShouldBe(
                PostgresErrorCodes.CheckViolation,
                $"Rejet pour une autre raison : {pge.SqlState} - {pge.MessageText}"
        );
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task TC_PRO01_009_Produits_PrixAchatInvalide_Rejete(int price)
    {
        await using var ctx = db.CreateContext();

        Guid userid = Guid.NewGuid();

        ctx.Users.Add(new User
        {
            UserId = userid,
            Username = $"TestUser_{Guid.NewGuid()}",
            EmailAddress = "test@test.test",
            PasswordHash = "a",
            CreationDate = DateTime.UtcNow,
            Role = new Role { RoleName = $"TestRole_{Guid.NewGuid()}" }
        });

        ctx.Items.Add(new Item
        {
            ItemId = Guid.NewGuid(),
            Name = $"TestObject_{Guid.NewGuid()}",
            Description = "Nothing to see here",
            PurchasePrice = price,
            SalePrice = 1,
            Quantity = 1,
            User_id = userid,
        });


        var e = await Should.ThrowAsync<DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception de clause CHECK"
        );

        var pge = e.InnerException.ShouldBeOfType<PostgresException>();
        pge.SqlState.ShouldBe(
                PostgresErrorCodes.CheckViolation,
                $"Rejet pour une autre raison : {pge.SqlState} - {pge.MessageText}"
        );
    }

    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task TC_PRO01_010_Produits_PrixVenteInvalide_Rejete(int price)
    {
        await using var ctx = db.CreateContext();

        Guid userid = Guid.NewGuid();

        ctx.Users.Add(new User
        {
            UserId = userid,
            Username = $"TestUser_{Guid.NewGuid()}",
            EmailAddress = "test@test.test",
            PasswordHash = "a",
            CreationDate = DateTime.UtcNow,
            Role = new Role { RoleName = $"TestRole_{Guid.NewGuid()}" }
        });

        ctx.Items.Add(new Item
        {
            ItemId = Guid.NewGuid(),
            Name = $"TestObject_{Guid.NewGuid()}",
            Description = "Nothing to see here",
            PurchasePrice = 1,
            SalePrice = price,
            Quantity = 1,
            User_id = userid,
        });


        var e = await Should.ThrowAsync<DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "La base de donnée n'a pas levé d'exception de clause CHECK"
        );

        var pge = e.InnerException.ShouldBeOfType<PostgresException>();
        pge.SqlState.ShouldBe(
                PostgresErrorCodes.CheckViolation,
                $"Rejet pour une autre raison : {pge.SqlState} - {pge.MessageText}"
        );
    }

}
