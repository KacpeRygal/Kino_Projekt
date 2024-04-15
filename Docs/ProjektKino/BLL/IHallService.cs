using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IHallService
    {
        IEnumerable<HallResponseDTO> GetHalls();
        HallResponseDTO GetHall(int id);
        void DeleteHall(int id);
        void PutHall(int id, HallRequestDTO hallRequestDTO);
        void PostHall(HallRequestDTO hallRequestDTO);
    }
}
