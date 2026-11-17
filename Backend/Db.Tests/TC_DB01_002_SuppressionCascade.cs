using Microsoft.EntityFrameworkCore;
using Shouldly;
using WebAPI.Models;

namespace Db.Tests;

//devin

// BUG: la suppression d'un Customer ou d'une VAT efface aussi les factures
// liees (ON DELETE CASCADE dans les migrations). Ces tests verifient que la
// facture doit survivre a la suppression de ses references.
[Collection("db")]
public class TC_DB01_002_SuppressionCascade(PostgresFixture db)
{
    private async Task<(Guid CustomerId, Guid VatId, Guid InvoiceId)> SeedInvoiceAsync()
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
        var customer = new Customer
        {
            Name = $"Customer_{Guid.NewGuid()}",
            Email = $"{Guid.NewGuid()}@test.com"
        };
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

        return (customer.CustomerId, vat.VatId, invoice.CustomerInvoiceId);
    }

    [Fact]
    public async Task TC_DB01_002_SuppressionClient_FactureSupprimee_Bug()
    {
        var (customerId, _, invoiceId) = await SeedInvoiceAsync();

        await using (var ctx = db.CreateContext())
        {
            var customer = await ctx.Customers.FindAsync([customerId], TestContext.Current.CancellationToken);
            customer.ShouldNotBeNull();
            ctx.Customers.Remove(customer);
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        }

        await using var check = db.CreateContext();
        var invoice = await check.CustomerInvoices
            .FirstOrDefaultAsync(i => i.CustomerInvoiceId == invoiceId, TestContext.Current.CancellationToken);

        invoice.ShouldNotBeNull(
            "BUG: la facture a ete supprimee en cascade avec le client. " +
            "La FK CustomerInvoices.Customer_id devrait etre en Restrict, pas Cascade."
        );
    }

    [Fact]
    public async Task TC_DB01_002_SuppressionTVA_FactureSupprimee_Bug()
    {
        var (_, vatId, invoiceId) = await SeedInvoiceAsync();

        await using (var ctx = db.CreateContext())
        {
            var vat = await ctx.VATs.FindAsync([vatId], TestContext.Current.CancellationToken);
            vat.ShouldNotBeNull();
            ctx.VATs.Remove(vat);
            await ctx.SaveChangesAsync(TestContext.Current.CancellationToken);
        }

        await using var check = db.CreateContext();
        var invoice = await check.CustomerInvoices
            .FirstOrDefaultAsync(i => i.CustomerInvoiceId == invoiceId, TestContext.Current.CancellationToken);

        invoice.ShouldNotBeNull(
            "BUG: la facture a ete supprimee en cascade avec la TVA. " +
            "La FK CustomerInvoices.Vat_id devrait etre en Restrict, pas Cascade."
        );
    }
}
