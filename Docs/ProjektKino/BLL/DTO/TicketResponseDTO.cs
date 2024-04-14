using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class TicketResponseDTO
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int ScreeningID { get; set; }
        public double Price { get; set; }
        public DateTime Date { get; set; }
        public User User { get; set; }
        public Screening Screening { get; set; }
        public IEnumerable<Seat> Seats { get; set; }
    }
}
