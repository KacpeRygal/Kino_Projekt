using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface ISeatService
    {
        SeatResponseDTO GetSeat(int id);
        void DeleteSeat(int id);
        void PutSeat(int id, SeatRequestDTO seatRequestDTO);
        void PostSeat(SeatRequestDTO seatRequestDTO);
    }
}
