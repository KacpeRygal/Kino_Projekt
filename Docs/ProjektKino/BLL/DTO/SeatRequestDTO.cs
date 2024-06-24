using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class SeatRequestDTO
    {
        public int TicketID { get; set; }
        public int HallID { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public bool Occupied { get; set; }
    
    }
}
