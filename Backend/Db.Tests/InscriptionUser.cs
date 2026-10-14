using Npgsql;
using Shouldly;
using WebAPI.Models;
using System.Linq;

namespace Db.Tests;

[Collection("db")]
public class InscriptionUser(PostgresFixture db)
{

    [Fact]
    public async Task DoublonUtilisateur_username()
    {
        await using var ctx = db.CreateContext();

        string username = "Smitty Werbenjägermenjensen";

        ctx.Users.Add(new User()
        {
            Username = username,
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        });
        ctx.Users.Add(new User()
        {
            Username = username,
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        });

        Should.Throw<Microsoft.EntityFrameworkCore.DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "Erreur, pas de clause UNIQUE sur username"
        );
    }

    [Fact]
    public async Task DoublonUtilisateur_email()
    {
        await using var ctx = db.CreateContext();

        ctx.Users.Add(new User()
        {
            Username = "Smitty1",
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        });
        ctx.Users.Add(new User()
        {
            Username = "Smitty2",
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        });

        Should.Throw<Microsoft.EntityFrameworkCore.DbUpdateException>(
        async () =>
        {
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "Erreur, pas de clause UNIQUE sur email"
        );
    }

    [Fact]
    public async Task DoublonIdUtilisateur_id()
    {
        await using var ctx = db.CreateContext();

        Guid sameId = Guid.NewGuid();

        User u1 = new()
        {
            UserId = sameId,
            Username = "Smitty1",
            EmailAddress = "smitty1@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        };

        ctx.Users.Add(u1);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        await using var ctx2 = db.CreateContext();
        User u2 = new()
        {
            UserId = sameId,
            Username = "Smitty2",
            EmailAddress = "smitty2@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        };


        ctx2.Users.Add(u2);
        Should.Throw<Microsoft.EntityFrameworkCore.DbUpdateException>(
        async () =>
        {
            await ctx2.SaveChangesAsync(TestContext.Current.CancellationToken);
        },
        "Erreur, pas de clause UNIQUE sur UserId"
        );
    }
}
