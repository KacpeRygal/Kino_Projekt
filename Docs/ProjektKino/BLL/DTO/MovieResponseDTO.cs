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
    public class MovieResponseDTO
    {
        public int ID { get; set; }
        public DateTime Time { get; set; }
        public string Language { get; set; }
        public int Score { get; set; }
        public string Name { get; set; }

    }
}
