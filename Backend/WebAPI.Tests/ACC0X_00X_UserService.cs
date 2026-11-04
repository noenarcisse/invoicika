using Microsoft.EntityFrameworkCore;
using Shouldly;
using NSubstitute;

using WebAPI.Models;
using WebAPI.Services;
using WebAPI.Data;

namespace WebAPI.Tests;

//TODO
//implementation de test rapide pour tenter de voir quelle zone du backend je peux tester
//et avec quels outils
//au final je peux pas mock car l'injection de dbcontext de EF est concret :<

/// <summary>
/// Unit tests for the UserService
/// </summary>
public sealed class ACC0X_00X_UserService : IDisposable
{
    private readonly InvoicikaDbContext ctx;

    public ACC0X_00X_UserService()
    {
        ctx = CreateContext();
    }

    //zzz, obligé de faire une fausse DB en ram, le dbctx de EF est pas abstrait et utilisable par substitute
    private static InvoicikaDbContext CreateContext()
    {
        var options = new DbContextOptionsBuilder<InvoicikaDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString())
            .Options;
        return new InvoicikaDbContext(options);
    }
    //InvoicikaDbContext _dbCtxMock = Substitute.For<InvoicikaDbContext>();

    [Fact]
    public async Task TC_UserNameExists_emptyDB()
    {
        //_dbCtxMock.Returns<>();
        var ctx = CreateContext();
        var userid = Guid.NewGuid();
        ctx.Users.Add(new User
        {
            UserId = userid,
            Username = "Test",
            PasswordHash = "x",
            EmailAddress = "Test@Test.test",
            Role = new Role
            {
                RoleId = Guid.NewGuid(),
                RoleName = "Flipflop"
            }
        });

        await ctx.SaveChangesAsync(CancellationToken.None);

        var us = new UserService(ctx);
        var res = await us.GetUserByIdAsync(userid);

        res.ShouldNotBe(null);
        res.Username.ShouldBe("Test");
    }

    public void Dispose()
    {
        ctx.Database.EnsureDeleted();
        ctx.Dispose();
    }

}
