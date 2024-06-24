using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class OpinionRequestDTO
    {
        public int UserID { get; set; }
        public int MovieID { get; set; }
        public int Value { get; set; }
        public string Content { get; set; }
    }
}
