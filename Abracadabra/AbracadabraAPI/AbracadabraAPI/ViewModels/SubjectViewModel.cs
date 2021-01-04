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
        [Required]
        [MaxLength(25, ErrorMessage ="Subject name can't be longer then 25 characters")]
        [MinLength(3, ErrorMessage = "Subject should atleast be 3 characters long")]
        public string SubjectName { get; set; }
    }
}
