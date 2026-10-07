using Microsoft.EntityFrameworkCore;
using Npgsql;
using Testcontainers.PostgreSql;
using WebAPI.Data;


namespace Db.Tests;

public class PostgresFixture : IAsyncLifetime
{
    PostgreSqlContainer _pg = new PostgreSqlBuilder("postgres:16").Build();
    public string ConnectionString => _pg.GetConnectionString();

    // iasynclifetime contract :d
    // ca cree et dispose en fin de vie
    public async ValueTask InitializeAsync() 
    {
        await _pg.StartAsync();
        await using var ctx = CreateContext();
        await ctx.Database.MigrateAsync();
    }
    public ValueTask DisposeAsync() => _pg.DisposeAsync();

    public InvoicikaDbContext CreateContext()
    {
        return new(
                    new DbContextOptionsBuilder<InvoicikaDbContext>()
                        .UseNpgsql(_pg.GetConnectionString())
                        .Options
        );
    }

    public async Task<NpgsqlConnection> OpenConnectionAsync()
    {
        var conn = new NpgsqlConnection(ConnectionString);
        await conn.OpenAsync();
        return conn;
    }
}

[CollectionDefinition("db")]
public class CollectionDB : ICollectionFixture<PostgresFixture>;