using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class UserWithExpertFieldsViewModel
    {
        public string ID { get; set; }

        public string Username { get; set; }

        public List<string> Fields { get; set; }
    }
}
