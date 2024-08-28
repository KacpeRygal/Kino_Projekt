using BLL;
using BLL.DTO;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BLL_EF
{
    public class TicketService : ITicketService
    {
        private CinemaContext dbContext;
        public TicketService(CinemaContext dbContext) { this.dbContext = dbContext; }
        public void DeleteTicket(int id)
        {
            Ticket ticket = dbContext.Ticket.Find(id);
            dbContext.Ticket.Remove(ticket);
            dbContext.SaveChanges();
        }

        public TicketResponseDTO GetTicket(int id)
        {
            Ticket ticket = dbContext.Ticket.Find(id);
            if (ticket == null) return null;

            TicketResponseDTO response = new TicketResponseDTO
            {
                ID = ticket.ID,
                UserID = ticket.UserID,
                Date = ticket.Date,
                ScreeningID = ticket.ScreeningID,
                Price = ticket.Price
            };
            return response;
        }

        public void PostTicket(TicketRequestDTO ticketRequestDTO)
        {
            Ticket ticket = new()
            {
                UserID = ticketRequestDTO.UserID,
                ScreeningID = ticketRequestDTO.ScreeningID,
                Price = ticketRequestDTO.Price,
                Date = ticketRequestDTO.Date,
            };
            dbContext.Ticket.Add(ticket);
            dbContext.SaveChanges();
        }

        public void PutTicket(int id, TicketRequestDTO ticketRequestDTO)
        {
            Ticket ticket = dbContext.Ticket.Find(id);
            ticket.UserID = ticketRequestDTO.UserID;
            ticket.Date = ticketRequestDTO.Date;
            ticket.ScreeningID = ticketRequestDTO.ScreeningID;
            ticket.Price = ticketRequestDTO.Price;
            dbContext.SaveChanges();
        }

        public SeatResponseDTO GetSeat(int id)
        {
            Seat seat = dbContext.Seat.Where(x => x.TicketID == id).FirstOrDefault();
                SeatResponseDTO response = new SeatResponseDTO
                {
                    ID = seat.ID,
                    TicketID = seat.TicketID,
                    HallID = seat.HallID,
                    Column = seat.Column,
                    Row = seat.Row,
                    Occupied = seat.Occupied
                };
                return response;
        }
        public TicketResponseDTO GetTicketForSeats(int userId,int screeningID, DateTime date)
        {
            Ticket ticket = dbContext.Ticket.Where(x => x.UserID == userId && x.ScreeningID == screeningID && x.Date.Equals(date))
        .FirstOrDefault();

            if (ticket == null) return null;

            TicketResponseDTO response = new TicketResponseDTO
            {
                ID = ticket.ID,
                UserID = ticket.UserID,
                Date = ticket.Date,
                ScreeningID = ticket.ScreeningID,
                Price = ticket.Price
            };
            return response;
        }
    }
}
