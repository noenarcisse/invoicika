using NSubstitute;
using Shouldly;

namespace WebAPI.Tests;

public interface IMarcheur
{
    public bool Marcher();
}

public class UnitTest1
{
    public IMarcheur mockMarcheur = Substitute.For<IMarcheur>();

    [Fact]
    public void Test1()
    {
        bool b = true;
        b.ShouldBe(true);
    }
    [Fact]
    public void Test2()
    {
        string s = "Salut je teste si toute la config est faite";
        s.ShouldContain("config");
    }

    [Fact]
    public void Test3()
    {
        var vector2 = new
        {
            x = 1,
            y = 2
        };
        vector2.ShouldBe(new { x = 1, y = 1 }, "La mission est un echec !");
    }

    [Fact]
    public void Test4()
    {
        mockMarcheur.Marcher().Returns(true);
        bool res = mockMarcheur.Marcher();
        res.ShouldBe(true, "C'est un echec critique !");

    }
}
