using Npgsql;
using Shouldly;
using WebAPI.Models;
using System.Linq;

namespace Db.Tests;

[Collection("db")]
public class BidonDBTest(PostgresFixture db)
{
    [Fact]
    public async Task GetOneUser()
    {
        await using var conn = await db.OpenConnectionAsync();
        await using var query = new NpgsqlCommand("select 1", conn);

        var res = await query.ExecuteScalarAsync();

        res.ShouldBe(1);
    }

    [Fact]
    public async Task Un_user_insere_est_retrouve_via_ef()
    {
        await using var ctx = db.CreateContext();
        ctx.Users.Add(new User { Username = "bob", EmailAddress = "bob@test.com", PasswordHash = "hash", Role = new Role { RoleName = "Admin" } });
        await ctx.SaveChangesAsync();

        await using var fresh = db.CreateContext();
        User? user = fresh.Users.FirstOrDefault(u => u.Username == "bob");

        user.ShouldNotBeNull();
        user.EmailAddress.ShouldBe("bob@test.com");
    }

    [Fact]
    public async Task Deux_users_insere_est_retrouve_via_ef()
    {
        await using var ctx = db.CreateContext();
        ctx.Users.Add(new User { Username = "bob", EmailAddress = "bob@test.com", PasswordHash = "hash", Role = new Role { RoleName = "Admin" } });
        ctx.Users.Add(new User { Username = "bob", EmailAddress = "bob@test.com", PasswordHash = "hash", Role = new Role { RoleName = "Admin" } });
        await ctx.SaveChangesAsync();

        await using var fresh = db.CreateContext();
        List<User> users = fresh.Users.Where(u => u.Username == "bob").ToList();

        users.ShouldNotBeEmpty();
        users.ShouldAllBe(u => u.Username == "bob" && u.EmailAddress == "bob@test.com");
    }
}
