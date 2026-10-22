using Microsoft.EntityFrameworkCore;
using Shouldly;
using WebAPI.Models;

using WebAPI.Services;

namespace WebAPI.Tests;

[Collection("db")]
public class DB01_001_SuppressionLogiques(PostgresFixture db)
{
    /// <summary>
    /// Deleting a user should not remove the user from the database but mark him a delete or hidden
    /// </summary>
    /// <returns></returns>
    [Fact]
    public async Task TC_DB01_001_SuppressionLogique_User()
    {
        User user = new()
        {
            Username = "Smitty Werbenjägermanjansen",
            EmailAddress = "smitty@test.com",
            PasswordHash = "jGl25bVBBBW96Qi9Te4V37Fnqchz/Eu4qB9vKrRIqRg=",
            Role = new Role { RoleName = "Admin" }
        };

        await using var ctx = db.CreateContext();
        ctx.Users.Add(user);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        await using var ctx2 = db.CreateContext();

        int c = ctx.Users.Count(u => u.Username == user.Username);
        c.ShouldBe(1);

        var u2 = ctx2.Users.FirstOrDefault(u => u.Username == user.Username);
        u2.ShouldNotBeNull();
        u2.Username.ShouldBe("Smitty Werbenjägermanjansen");

        await using var ctx3 = db.CreateContext();

        UserService us = new(ctx3);
        await us.DeleteUserAsync(user.UserId);

        await ctx3.SaveChangesAsync(TestContext.Current.CancellationToken);

        await using var ctx4 = db.CreateContext();
        var u4 = ctx4.Users.IgnoreQueryFilters().SingleOrDefault(u => u.UserId == user.UserId);
        u4.ShouldNotBeNull();
    }

}
