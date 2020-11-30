using AbracadabraAPI.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class UserViewModel
    {
        public string ID { get; set; }

        public string Username { get; set; }

        public string Email { get; set; }

        public string Role { get; set; }

        public int NrOfTimesReported { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public DateTime LastLoggedIn { get; set; }
    }
}
