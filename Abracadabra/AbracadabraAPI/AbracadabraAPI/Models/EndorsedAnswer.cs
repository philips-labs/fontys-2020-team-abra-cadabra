﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AbracadabraAPI.Models
{
    public class EndorsedAnswer
    {
        public int Id { get; set; }
        public int AnswerId { get; set; }
        public string UserId { get; set; }
    }
}
