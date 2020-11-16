using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.ViewModels
{
    public class SubjectViewModel
    {
        [Key]
        public int ID { get; set; }
        public string SubjectName { get; set; }
    }
}
