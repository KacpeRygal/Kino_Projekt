using Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class OpinionResponseDTO
    {
        public int ID { get; set; }
        public int UserID { get; set; }
        public int MovieID { get; set; }
        public int Value { get; set; }
        public string Content { get; set; }
        public User User { get; set; }
        public Movie Movie { get; set; }
    }
}
