using System;
using Xunit;
using AbracadabraAPI;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.Mvc;
using AbracadabraAPI.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Newtonsoft.Json;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using AbracadabraAPI.Models;
using FluentAssertions;
using System.Net.Http;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.TestHost;
using Microsoft.AspNetCore.Authorization.Policy;

namespace AbraCadabraAPITests
{
    public class SubjectControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup> _factory;

        public SubjectControllerTests(
        CustomWebApplicationFactory<Startup> factory)
        {
            _factory = factory;
            _client = factory.WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                {
                    services.AddSingleton<IPolicyEvaluator, FakePolicyEvaluator>();
                });
            }).CreateClient(new WebApplicationFactoryClientOptions
            {
                AllowAutoRedirect = false,

            });
        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_All()
        {
            var response = await _client.GetAsync("api/Subjects");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_One()
        {
            var response = await _client.GetAsync("api/Subjects/Cooking");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}