using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AbracadabraAPI.Data;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AbracadabraAPI.Services
{
    public class UpdateTrendingService : IHostedService, IDisposable
    {
        private readonly long _originalTime = 1577883600;

        private readonly ILogger<UpdateTrendingService> _logger;
        private readonly IServiceScopeFactory _scopeFactory;
        private Timer _timer;

        public UpdateTrendingService(ILogger<UpdateTrendingService> logger, IServiceScopeFactory scopeFactory)
        {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync(CancellationToken cancellation)
        {
            _logger.LogInformation("Update trending service is running.");

            _timer = new Timer(UpdateTrending, null, TimeSpan.Zero,
                TimeSpan.FromMinutes(1));

            return Task.CompletedTask;
        }

        private void UpdateTrending(object state)
        {
            try
            {
                using (var scope = _scopeFactory.CreateScope())
                {
                    var context = scope.ServiceProvider.GetRequiredService<AbracadabraContext>();
                    foreach (var question in context.Questions)
                    {
                        var score = question.Upvotes - question.Downvotes;

                        var order = Math.Log10(Math.Max(Math.Abs(score), 1));

                        double sign = Math.Sign(order);

                        var dto = new DateTimeOffset(question.DateTimeCreated);
                        var time = dto.ToUnixTimeSeconds();
                        var seconds = time - _originalTime;

                        question.TrendingScore = Math.Round(sign * order + seconds / 45000, 7);
                    }

                    context.SaveChanges();
                    _logger.LogInformation("Updated trending scores.");
                }
            }
            catch(Exception ex)
            {
                _logger.LogError("Database has not initialized!");
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _logger.LogInformation("Update trending service is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }
    }
}
