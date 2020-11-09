using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AbracadabraAPI.Data;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace AbracadabraAPI.Services
{
    public class UpdateTrendingService : IHostedService, IDisposable
    {
        private readonly ILogger<UpdateTrendingService> _logger;
        private readonly AbracadabraContext _context;
        private Timer _timer;

        public UpdateTrendingService(ILogger<UpdateTrendingService> logger, AbracadabraContext context)
        {
            _logger = logger;
            _context = context;
        }

        public Task StartAsync(CancellationToken cancellation)
        {
            _logger.LogInformation("Update trending service is running.");

            _timer = new Timer(UpdateTrending, null, TimeSpan.Zero,
                TimeSpan.FromMinutes(15));

            return Task.CompletedTask;
        }

        private void UpdateTrending(object state)
        {

            _logger.LogInformation("Updated trending scores.");
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
