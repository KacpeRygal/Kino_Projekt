using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL.DTO
{
    public class UserRequestDTO
    {
        public string Login { get; set; }
        public string Password { get; set; }
        public UserTypeEnum Type { get; set; }
        public string Name { get; set; }
        public bool CanReduce { get; set; }
        public IEnumerable<Ticket> ?Tickets { get; set; }
        public IEnumerable<Opinion> ?Opinions { get; set; }
    }
}
