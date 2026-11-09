using Microsoft.EntityFrameworkCore;
using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

[Collection("db")]
public class TC_ACC01_InscriptionUser(PostgresFixture db)
{



    [Fact]
    public async Task TC_ACC01_009_AjoutUser_Valid_Accepte()
    {
        await using var ctx = db.CreateContext();


        Guid id = Guid.NewGuid();
        string username = "Smitty Werbenjägermenjensen";

        ctx.Users.Add(new User()
        {
            UserId = id,
            Username = username,
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        });

        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        await using var ctx2 = db.CreateContext();
        var c = ctx2.Users
            .Include(u => u.Role)
            .FirstOrDefault(c => c.Username == username);

        c.ShouldNotBeNull();
        c.UserId.ShouldBe(id);
        c.Username.ShouldBe(username);
        c.Role.RoleName.ShouldBe("Admin");

    }

    [Fact]
    public async Task TC_ACC01_010_AjoutUser_RoleIdNull_Rejete()
    {
        await using var ctx = db.CreateContext();

        var username = $"smitty-{Guid.NewGuid():N}";

        var e = await Should.ThrowAsync<PostgresException>(async () =>
            await ctx.Database.ExecuteSqlInterpolatedAsync($@"
            INSERT INTO ""Users""
                (""UserId"", ""Username"", ""EmailAddress"", ""PasswordHash"", ""Role_id"", ""CreationDate"", ""UpdateDate"")
            VALUES
                ({Guid.NewGuid()}, {username}, {username + "@test.com"}, {"hash"}, NULL, {DateTime.UtcNow}, {DateTime.UtcNow})",
                TestContext.Current.CancellationToken),
            "La base a accepté un user avec Role_id NULL : la colonne est nullable");

        e.SqlState.ShouldBe(PostgresErrorCodes.NotNullViolation,
            $"Rejet pour une autre raison : {e.SqlState} - {e.MessageText}");
        e.ColumnName.ShouldBe("Role_id");
    }

    [Fact(Skip = "Ignoré, l'ORM et le DTO empechent le check du null en DB, passé en test SQL pur")]
    public async Task TC_ACC01_010_AjoutUser_SansRole_Rejete()
    {
        await using var ctx = db.CreateContext();


        Guid id = Guid.NewGuid();
        string username = "Smitty Werbenjägermenjensen";

        ctx.Users.Add(new User()
        {
            UserId = id,
            Username = username,
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg="
        });



        var e = await Should.ThrowAsync<Microsoft.EntityFrameworkCore.DbUpdateException>(
            async () =>
            {
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
            },
            "La base de donnée n'a pas levé d'exception"
        );

        e.InnerException.ShouldBeOfType<PostgresException>().SqlState
            .ShouldBe(PostgresErrorCodes.ForeignKeyViolation);

    }

    [Fact]
    public async Task TC_ACC01_007_AjoutUser_DoublonUsername_Rejete()
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
                "Erreur, pas de clause UNIQUE sur username"
            );
    }

    [Fact]
    public async Task TC_ACC01_008_AjoutUser_DoublonEmail_Rejete()
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
                "Erreur, pas de clause UNIQUE sur email"
            );
    }

    [Fact]
    public async Task TC_ACC01_006_AjoutUser_DoublonID_Rejete()
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
                "Erreur, pas de clause UNIQUE sur l'ID"
            );
    }
}
