using BLL;
using BLL.DTO;
using DAL;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class SeatService : ISeatService
    {
        private CinemaContext dbContext;
        public SeatService(CinemaContext dbContext) { this.dbContext = dbContext; }

        public void DeleteSeat(int id)
        {
            Seat seat = dbContext.Seat.Find(id);
            dbContext.Seat.Remove(seat);
            dbContext.SaveChanges();
        }

        public SeatResponseDTO GetSeat(int id)
        {
            Seat seat = dbContext.Seat.Find(id);
            if (seat == null) return null;

            SeatResponseDTO response = new SeatResponseDTO
            {
                ID = seat.ID,
                TicketID = seat.TicketID,
                Column = seat.Column,
                Row = seat.Row,
                HallID = seat.HallID,
                Occupied = seat.Occupied
            };
            return response;
        }

        public void PostSeat(SeatRequestDTO seatRequestDTO)
        {
            Seat seat = new()
            {
                TicketID = seatRequestDTO.TicketID,
                Column = seatRequestDTO.Column,
                Row = seatRequestDTO.Row,
                HallID = seatRequestDTO.HallID,
                Occupied = seatRequestDTO.Occupied
            };
            dbContext.Seat.Add(seat);
            dbContext.SaveChanges();
        }

        public void PutSeat(int id, SeatRequestDTO seatRequestDTO)
        {
            Seat seat = dbContext.Seat.Find(id);
            seat.TicketID = seatRequestDTO.TicketID;
            seat.Column = seatRequestDTO.Column;
            seat.Row = seatRequestDTO.Row;
            seat.HallID = seatRequestDTO.HallID;
            seat.Occupied = seatRequestDTO.Occupied;
            dbContext.SaveChanges();
        }
    }
}
