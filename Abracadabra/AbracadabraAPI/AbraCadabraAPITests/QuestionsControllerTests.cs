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
using AbracadabraAPI.ViewModels;
using Microsoft.AspNetCore.Authentication;
using System.Net.Http.Headers;
using System.Dynamic;
using System.Net.Http.Formatting;

namespace AbraCadabraAPITests
{
    public class QuestionsControllerTests : IClassFixture<CustomWebApplicationFactory<Startup>>
    {
        private readonly HttpClient _client;
        private readonly CustomWebApplicationFactory<Startup> _factory;
        protected dynamic token;

        public QuestionsControllerTests(
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
            token = new ExpandoObject();
            token.sub = Guid.NewGuid();
            token.role = new[] { "sub_role", "admin" };
            token.name = new[] { "name", "Ricardo" };

        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_All()
        {
            var response = await _client.GetAsync("api/Questions");

            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        [Fact]
        public async Task Get_Request_Should_Return_Ok_One()
        {
            var response = await _client.GetAsync("api/Questions/1");
            var question = JsonConvert.DeserializeObject<Question>(await response.Content.ReadAsStringAsync());
            Assert.Equal(1, question.ID);
        }
        [Fact]
        public async Task Get_Request_Wrong_ID()
        {

            var response = await _client.GetAsync("api/Questions/3");
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }
      
        [Fact]
        public async Task Get_Request_Order_By_New_Unanswered()
        {
            var response = await _client.GetAsync("api/Questions/Cooking/unanswered");
            var questions = JsonConvert.DeserializeObject<Question[]>(await response.Content.ReadAsStringAsync());

            questions.Should().BeInDescendingOrder();
        }
        [Fact]
        public async Task Get_Request_Returns_Answers_Count_Correctly()
        {
            var response = await _client.GetAsync("api/Questions/1");
            var question = JsonConvert.DeserializeObject<QuestionViewModel>(await response.Content.ReadAsStringAsync());


            Assert.Equal(2, question.AnswerViewModels.Count);
        }

        [Fact]
        public async Task Post_Succeed_Question()
        {

            var response = await _client.PostAsync("api/Questions", new StringContent(JsonConvert.SerializeObject(new Question()
            {
                UserID = "1",
                Title = "How to  scallops",
                Description = "How do I  prepare scallops?",
                DateTimeCreated = DateTime.Parse("2020-11-19-12:00"),
                SubjectID = 1,
                Category = "Cooking",

            }), Encoding.UTF8, "application/json"));


            response.StatusCode.Should().Be(HttpStatusCode.Created);
        }
        [Fact]
        public async Task Get_Request_Order_By_New()
        {
            
            var response = await _client.GetAsync("api/Questions/Cooking/new");
            var questions = JsonConvert.DeserializeObject<Question[]>(await response.Content.ReadAsStringAsync());

            questions.Should().BeInDescendingOrder(x => x.DateTimeCreated);
        }
        //Please somebody fix this, I give up -Snechar
        [Fact]
        public async Task Delete_Succeed_Question()
        {
            //System.Diagnostics.Debugger.Launch();
            string data = JsonConvert.SerializeObject(new
            {
                
                Email = "admin@gmail.com",
                Password = "Password@1",
            });

            System.Diagnostics.Debugger.Launch();
            var client = new HttpClient();
            var content = new StringContent(data, Encoding.UTF8, "application/json");

            var login = await _client.PostAsync("api/authenticate/login", content);


        

            var response = await _client.DeleteAsync("api/Questions/1");

            response.StatusCode.Should().Be(HttpStatusCode.NoContent);
        }


    }
}