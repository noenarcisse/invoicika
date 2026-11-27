using Microsoft.EntityFrameworkCore;
using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

//devin

[Collection("db")]
public class TC_DB01_005_SuppressionUser(PostgresFixture db)
{

    [Fact]
    [Trait("Tag", "bugs")]
    [Trait("Tag", "jira-IN-42")]
    public async Task TC_DB01_005_SuppressionUser_ItemSupprime_Bug()
    {
        var (userId, itemId, _) = await SeedUserItemGroupAsync();

        await using (var ctx = db.CreateContext())
        {
            var user = await ctx.Users.FindAsync([userId], TestContext.Current.CancellationToken);
            user.ShouldNotBeNull();
            ctx.Users.Remove(user);

            var ex = await Should.ThrowAsync<DbUpdateException>(async () =>
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken));

            PostgresException psqlEx = ex.InnerException.ShouldBeOfType<PostgresException>();
            psqlEx.SqlState.ShouldBe(PostgresErrorCodes.ForeignKeyViolation);
        }

        await using var check = db.CreateContext();
        var item = await check.Items
            .FirstOrDefaultAsync(i => i.ItemId == itemId, TestContext.Current.CancellationToken);

        item.ShouldNotBeNull(
            "BUG: l'item du user a ete supprime en cascade avec lui. " +
            "La FK Items.User_id devrait etre en Restrict, pas Cascade."
        );
    }

    [Fact]
    [Trait("Tag", "bugs")]
    [Trait("Tag", "jira-IN-42")]
    public async Task TC_DB01_005_SuppressionUser_ItemGroupSupprime_Bug()
    {
        var (userId, _, itemGroupId) = await SeedUserItemGroupAsync();

        await using (var ctx = db.CreateContext())
        {
            var user = await ctx.Users.FindAsync([userId], TestContext.Current.CancellationToken);
            user.ShouldNotBeNull();
            ctx.Users.Remove(user);

            var ex = await Should.ThrowAsync<DbUpdateException>(async () =>
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken));

            PostgresException psqlEx = ex.InnerException.ShouldBeOfType<PostgresException>();
            psqlEx.SqlState.ShouldBe(PostgresErrorCodes.ForeignKeyViolation);
        }

        await using var check = db.CreateContext();
        var itemGroup = await check.ItemGroups
            .FirstOrDefaultAsync(g => g.ItemGroupId == itemGroupId, TestContext.Current.CancellationToken);

        itemGroup.ShouldNotBeNull(
            "BUG: l'item group du user a ete supprime en cascade avec lui. " +
            "La FK ItemGroups.User_id devrait etre en Restrict, pas Cascade."
        );
    }

    [Fact]
    [Trait("Tag", "bugs")]
    [Trait("Tag", "jira-IN-42")]
    public async Task TC_DB01_005_SuppressionUser_FactureSupprime_Bug()
    {
        Guid userId;
        Guid invoiceId;

        await using (var ctx = db.CreateContext())
        {
            var user = new User
            {
                Username = $"user_{Guid.NewGuid()}",
                EmailAddress = $"{Guid.NewGuid()}@test.com",
                PasswordHash = "hash",
                Role = new Role { RoleName = $"Role_{Guid.NewGuid()}" }
            };
            var customer = new Customer { Name = $"Customer_{Guid.NewGuid()}" };
            var vat = new VAT { Percentage = 20.00m };
            var invoice = new CustomerInvoice
            {
                Customer = customer,
                User = user,
                VAT = vat,
                SubTotalAmount = 100.00m,
                VatAmount = 20.00m,
                TotalAmount = 120.00m
            };

            ctx.CustomerInvoices.Add(invoice);
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

            userId = user.UserId;
            invoiceId = invoice.CustomerInvoiceId;
        }

        await using (var ctx = db.CreateContext())
        {
            var user = await ctx.Users.FindAsync([userId], TestContext.Current.CancellationToken);
            user.ShouldNotBeNull();
            ctx.Users.Remove(user);

            var ex = await Should.ThrowAsync<DbUpdateException>(async () =>
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken));

            PostgresException psqlEx = ex.InnerException.ShouldBeOfType<PostgresException>();
            psqlEx.SqlState.ShouldBe(PostgresErrorCodes.ForeignKeyViolation);
        }

        await using var check = db.CreateContext();
        var savedInvoice = await check.CustomerInvoices
            .FirstOrDefaultAsync(i => i.CustomerInvoiceId == invoiceId, TestContext.Current.CancellationToken);

        savedInvoice.ShouldNotBeNull(
            "BUG: la facture du user a ete supprimee en cascade avec lui. " +
            "La FK CustomerInvoices.User_id devrait etre en Restrict, pas Cascade."
        );
    }

    //PRIVATES
    private async Task<(Guid UserId, Guid ItemId, Guid ItemGroupId)> SeedUserItemGroupAsync()
    {
        await using var ctx = db.CreateContext();

        var user = new User
        {
            Username = $"user_{Guid.NewGuid()}",
            EmailAddress = $"{Guid.NewGuid()}@test.com",
            PasswordHash = "hash",
            Role = new Role { RoleName = $"Role_{Guid.NewGuid()}" }
        };
        var item = new Item
        {
            Name = $"Item_{Guid.NewGuid()}",
            PurchasePrice = 10.00m,
            SalePrice = 15.00m,
            Quantity = 1,
            User = user
        };
        var itemGroup = new ItemGroup
        {
            Title = $"Group_{Guid.NewGuid()}",
            User = user
        };

        ctx.Items.Add(item);
        ctx.ItemGroups.Add(itemGroup);
        await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

        return (user.UserId, item.ItemId, itemGroup.ItemGroupId);
    }
}
