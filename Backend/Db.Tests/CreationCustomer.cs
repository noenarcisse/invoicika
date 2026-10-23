using Npgsql;
using Shouldly;
using WebAPI.Models;
using System.Linq;

namespace Db.Tests;

[Collection("db")]
public class CreationCustomer(PostgresFixture db)
{

    [Fact]
    public async Task DoublonClient_email()
    {
        await using var ctx = db.CreateContext();

        string email = "smitty@test.com";

        ctx.Customers.Add(new Customer()
        {
            Name = "Smitty Werbenjägermenjensen",
            Address = "Rue de la Place du Roi, 42",
            PhoneNumber = "+334571884",
            Email = email
        });
        ctx.Customers.Add(new Customer()
        {
            Name = "Smitto Jerbenwägerjenmensen",
            Address = "Rue de la Place de la Reine, 42",
            PhoneNumber = "+334571885",
            Email = email
        });

        Should.Throw<Microsoft.EntityFrameworkCore.DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "Erreur, pas de clause UNIQUE sur email"
        );
    }



    //overkill, impossible

    [Fact]
    public async Task DoublonClient_id()
    {
        await using var ctx = db.CreateContext();

        Guid sameId = Guid.NewGuid();

        Customer u1 = new()
        {
            CustomerId = sameId,
            Name = "Smitty Werbenjägermenjensen",
            Address = "Rue de la Place du Roi, 42",
            PhoneNumber = "+334571884",
            Email = "smity@wjm.com"
        };

        ctx.Customers.Add(u1);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        await using var ctx2 = db.CreateContext();
        Customer u2 = new()
        {
            CustomerId = sameId,
            Name = "Smitty Werbenjägermenjensen",
            Address = "Rue de la Place du Roi, 42",
            PhoneNumber = "+334571885",
            Email = "smity@wjm.com"
        };


        ctx2.Customers.Add(u2);
        Should.Throw<Microsoft.EntityFrameworkCore.DbUpdateException>(
        async () =>
        {
            await ctx2.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "Erreur, pas de clause UNIQUE sur CustomerId"
        );
    }
}
