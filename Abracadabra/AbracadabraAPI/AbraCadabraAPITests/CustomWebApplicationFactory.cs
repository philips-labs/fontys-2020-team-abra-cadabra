using System;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Net.Http;
using AbracadabraAPI.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using WebMotions.Fake.Authentication.JwtBearer;


namespace AbraCadabraAPITests
{
    public class CustomWebApplicationFactory<TStartup> : WebApplicationFactory<TStartup> where TStartup : class
    {
        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var descriptor = services.SingleOrDefault(
                    d => d.ServiceType ==
                        typeof(DbContextOptions<AbracadabraContext>));
                services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = FakeJwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = FakeJwtBearerDefaults.AuthenticationScheme;
                }).AddFakeJwtBearer();


                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                services.AddDbContext<AbracadabraContext>(options =>
                {
                    options.UseInMemoryDatabase("InMemoryDbForTesting");
                });



                var sp = services.BuildServiceProvider();

                using (var scope = sp.CreateScope())
                {
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<AbracadabraContext>();
                    var logger = scopedServices.GetRequiredService<ILogger<CustomWebApplicationFactory<TStartup>>>();

                    db.Database.EnsureCreated();

                    try
                    {
                        Utilities.InitializeDbForTests(db);
                    }
                    catch (Exception ex)
                    {
                        logger.LogError(ex, "An error occurred seeding the " +
                            "database with News Articles", ex.Message);
                    }
                }
            });
        }

    }
}
