﻿using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class MovieRequestDTO
    {
        
        public DateTime Time { get; set; }
        public string Language { get; set; }
        public int Score { get; set; }
        public string Name { get; set; }

    }
}
