using System;
using Model;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class HallRequestDTO
    {
        public int Rows { get; set; }
        public int Columns { get; set; }
        public bool Full { get; set; }
        public HallTechnologyEnum Technology { get; set; }
        public IEnumerable<Screening> Screenings { get; set; }
        public IEnumerable<Seat> Seats { get; set; }
    }
}
