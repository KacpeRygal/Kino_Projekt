using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class ScreeningResponseDTO
    {
        public int ID { get; set; }
        public int HallID { get; set; }
        public int MovieID { get; set; }
        public DateTime Date { get; set; }
        public Hall Hall { get; set; }
        public Movie Movie { get; set; }
        public IEnumerable<Ticket> Tickets { get; set; }
    }
}
