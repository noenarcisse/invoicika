using Microsoft.EntityFrameworkCore;
using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

//devin + corrections

[Collection("db")]
public class TC_DB01_002_SuppressionRole(PostgresFixture db)
{
    private async Task<(Guid RoleId, Guid UserId, Guid ItemId)> SeedRoleUserItemAsync()
    {
        await using var ctx = db.CreateContext();

        var role = new Role { RoleName = $"Role_{Guid.NewGuid()}" };
        var user = new User
        {
            Username = $"user_{Guid.NewGuid()}",
            EmailAddress = $"{Guid.NewGuid()}@test.com",
            PasswordHash = "hash",
            Role = role
        };
        var item = new Item
        {
            Name = $"Item_{Guid.NewGuid()}",
            PurchasePrice = 10.00m,
            SalePrice = 15.00m,
            Quantity = 1,
            User = user
        };

        ctx.Items.Add(item);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        return (role.RoleId, user.UserId, item.ItemId);
    }

    [Fact]
    [Trait("Tag", "bugs")]
    [Trait("Tag", "jira-IN-42")]
    public async Task TC_DB01_002_SuppressionRole_UserSupprime_Bug()
    {
        var (roleId, userId, _) = await SeedRoleUserItemAsync();

        await using (var ctx = db.CreateContext())
        {
            var role = await ctx.Roles.FindAsync([roleId], TestContext.Current.CancellationToken);
            role.ShouldNotBeNull();
            ctx.Roles.Remove(role);


            var ex = await Should.ThrowAsync<DbUpdateException>(async () =>
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken));


            PostgresException psqlEx = ex.InnerException.ShouldBeOfType<PostgresException>();
            psqlEx.SqlState.ShouldBe(PostgresErrorCodes.ForeignKeyViolation);
        }

        await using var check = db.CreateContext();
        var user = await check.Users
            .FirstOrDefaultAsync(u => u.UserId == userId, TestContext.Current.CancellationToken);

        user.ShouldNotBeNull(
            "BUG: l'utilisateur a ete supprime en cascade avec son role. " +
            "La FK Users.Role_id devrait etre en Restrict, pas Cascade."
        );
    }

    [Fact(Skip = "Répétition du test précédent en SQL pur")]
    [Trait("Tag", "bugs")]
    [Trait("Tag", "jira-IN-42")]
    public async Task TC_DB01_002_SuppressionRole_SQL_UserSupprime_Bug()
    {
        var (roleId, userId, _) = await SeedRoleUserItemAsync();

        await using (var ctx = db.CreateContext())
        {
            await ctx.Database.ExecuteSqlInterpolatedAsync(
                $@"DELETE FROM ""Roles"" WHERE ""RoleId"" = {roleId}",
                TestContext.Current.CancellationToken);
        }

        await using var check = db.CreateContext();
        var user = await check.Users
            .FirstOrDefaultAsync(u => u.UserId == userId, TestContext.Current.CancellationToken);

        user.ShouldNotBeNull(
            "BUG: l'utilisateur a ete supprime en cascade par la contrainte " +
            "FK_Users_Roles_Role_id (ON DELETE CASCADE) au niveau de la base."
        );
    }

    [Fact]
    [Trait("Tag", "bugs")]
    [Trait("Tag", "jira-IN-42")]
    public async Task TC_DB01_002_SuppressionRole_ItemSupprime_Bug()
    {
        var (roleId, _, itemId) = await SeedRoleUserItemAsync();

        await using (var ctx = db.CreateContext())
        {
            var role = await ctx.Roles.FindAsync([roleId], TestContext.Current.CancellationToken);
            role.ShouldNotBeNull();
            ctx.Roles.Remove(role);

            var ex = await Should.ThrowAsync<DbUpdateException>(async () =>
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken));

            PostgresException psqlEx = ex.InnerException.ShouldBeOfType<PostgresException>();
            psqlEx.SqlState.ShouldBe(PostgresErrorCodes.ForeignKeyViolation);
        }

        await using var check = db.CreateContext();
        var item = await check.Items
            .FirstOrDefaultAsync(i => i.ItemId == itemId, TestContext.Current.CancellationToken);

        item.ShouldNotBeNull(
            "BUG: l'item du user a ete supprime en cascade (Role -> User -> Item). " +
            "Les FK Users.Role_id et Items.User_id devraient etre en Restrict, pas Cascade."
        );
    }
}
