using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IScreeningService
    {
        ScreeningResponseDTO GetScreening(int id);
        IEnumerable<TicketResponseDTO> GetTickets(int id);
        void DeleteScreening(int id);
        void PutScreening(int id, ScreeningRequestDTO screeningRequestDTO);
        void PostScreening(ScreeningRequestDTO screeningRequestDTO);
    }
}
