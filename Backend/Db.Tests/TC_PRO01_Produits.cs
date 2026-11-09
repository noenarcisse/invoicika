using Microsoft.EntityFrameworkCore.Design.Internal;
using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

[Collection("db")]
public class TC_PRO01_Produits(PostgresFixture db)
{
    [Fact(Skip = "To do")]
    public async Task TC_PRO01_007_Produits_UserIdNull_Rejete() { }


    [Theory]
    [InlineData(0)]
    [InlineData(-1)]
    public async Task TC_PRO01_007_Produits_QuantiteInvalide_Rejete(int quantity)
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
            Role = new Role { RoleName=$"TestRole_{Guid.NewGuid()}"}
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


        var e = await Should.ThrowAsync<Microsoft.EntityFrameworkCore.DbUpdateException>(
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
    public async Task TC_PRO01_008_Produits_PrixAchatInvalide_Rejete(int price)
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


        var e = await Should.ThrowAsync<Microsoft.EntityFrameworkCore.DbUpdateException>(
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
    public async Task TC_PRO01_008_Produits_PrixVenteInvalide_Rejete(int price)
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


        var e = await Should.ThrowAsync<Microsoft.EntityFrameworkCore.DbUpdateException>(
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
