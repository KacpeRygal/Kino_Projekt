using System;
using Model;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class HallResponseDTO
    {
        public int ID { get; set; }
        public int Rows { get; set; }
        public int Columns { get; set; }
        public bool Full { get; set; }
        public HallTechnologyEnum Technology { get; set; }

    }
}
