using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace AbracadabraAPI.ViewModels
{
    public class UserChangePasswordViewModel
    {
        public string ID { get; set; }

        public string CurrentPassword { get; set; }
        public string Password { get; set; }

    }
}
