using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class TicketRequestDTO
    {
        public int UserID { get; set; }
        public int ScreeningID { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
    }
}
