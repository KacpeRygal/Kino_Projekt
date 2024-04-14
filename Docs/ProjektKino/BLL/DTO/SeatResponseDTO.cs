using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class SeatResponseDTO
    {
        public int ID { get; set; }
        public int TicketID { get; set; }
        public int HallID { get; set; }
        public int Row { get; set; }
        public int Column { get; set; }
        public bool Occupied { get; set; }
        public Hall Hall { get; set; }
        public Ticket Ticket { get; set; }
    }
}
