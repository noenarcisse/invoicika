using Microsoft.EntityFrameworkCore;
using Npgsql;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

//todo
//passer en private seed la creation d'item et les refs attachées ?

//devin

// FK_CustomerInvoiceLines_Items_Item_id est en Restrict (a la difference des
// autres FK du schema). Ce test verifie que la suppression d'un Item reference
// par une ligne de facture est bien rejetee par la base (23503) et que
// ni l'item ni la ligne ne sont supprimes.
[Collection("db")]
public class TC_DB01_006_SuppressionItem(PostgresFixture db)
{
    [Fact]
    public async Task TC_DB01_006_SuppressionItem_CustomerInvoiceLines_Rejete()
    {
        Guid itemId;
        Guid invoiceLineId;

        await using (var ctx = db.CreateContext())
        {
            var role = new Role { RoleName = $"Role_{Guid.NewGuid()}" };
            var user = new User
            {
                Username = $"user_{Guid.NewGuid()}",
                EmailAddress = $"{Guid.NewGuid()}@test.com",
                PasswordHash = "hash",
                Role = role
            };
            var customer = new Customer
            {
                Name = $"Customer_{Guid.NewGuid()}",
                Email = $"{Guid.NewGuid()}@test.com"
            };
            var vat = new VAT { Percentage = 20.00m };
            var item = new Item
            {
                Name = $"Item_{Guid.NewGuid()}",
                PurchasePrice = 10.00m,
                SalePrice = 15.00m,
                Quantity = 1,
                User = user
            };
            var invoice = new CustomerInvoice
            {
                Customer = customer,
                User = user,
                VAT = vat,
                SubTotalAmount = 100.00m,
                VatAmount = 20.00m,
                TotalAmount = 120.00m
            };
            var line = new CustomerInvoiceLine
            {
                CustomerInvoice = invoice,
                Item = item,
                Quantity = 1,
                Price = 15.00m
            };

            ctx.CustomerInvoiceLines.Add(line);
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);

            itemId = item.ItemId;
            invoiceLineId = line.InvoiceLineId;
        }

        await using (var ctx = db.CreateContext())
        {
            var item = await ctx.Items.FindAsync([itemId], TestContext.Current.CancellationToken);
            item.ShouldNotBeNull();
            ctx.Items.Remove(item);

            var ex = await Should.ThrowAsync<DbUpdateException>(async () =>
                await ctx.SaveChangesAsync(TestContext.Current.CancellationToken),
                "La base aurait du rejeter la suppression d'un item reference par une ligne de facture");

            PostgresException psqlEx = ex.InnerException.ShouldBeOfType<PostgresException>();
            psqlEx.SqlState.ShouldBe(PostgresErrorCodes.ForeignKeyViolation);
            psqlEx.ConstraintName.ShouldBe("FK_CustomerInvoiceLines_Items_Item_id");
        }

        await using var check = db.CreateContext();
        var survivingItem = await check.Items
            .FirstOrDefaultAsync(i => i.ItemId == itemId, TestContext.Current.CancellationToken);
        var survivingLine = await check.CustomerInvoiceLines
            .FirstOrDefaultAsync(l => l.InvoiceLineId == invoiceLineId, TestContext.Current.CancellationToken);

        survivingItem.ShouldNotBeNull("L'item reference ne doit pas etre supprime");
        survivingLine.ShouldNotBeNull("La ligne de facture ne doit pas etre supprimee");
    }
}
