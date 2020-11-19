using System;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace AbracadabraAPI.Authentication
{
    public class ApplicationUser : IdentityUser
    {
        public int NrOfTimesReported { get; set; }

        public DateTime DateTimeCreated { get; set; }

        public DateTime LastLoggedIn { get; set; }
    }
}