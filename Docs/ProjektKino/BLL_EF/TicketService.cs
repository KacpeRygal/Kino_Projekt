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
                Date = ticketRequestDTO.Date,
                ScreeningID = ticketRequestDTO.ScreeningID,
                Price = ticketRequestDTO.Price
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

        public IEnumerable<SeatResponseDTO> GetSeats(int id)
        {
            var seats = dbContext.Seat.Where(x => x.TicketID == id);

            for (int i = 0; i < seats.Count(); i++)
            {
                Seat sc = seats.ElementAt(i);
                SeatResponseDTO response = new SeatResponseDTO
                {
                    ID = sc.ID,
                    TicketID = sc.TicketID,
                    HallID = sc.HallID,
                    Column = sc.Column,
                    Row = sc.Row,
                    Occupied = sc.Occupied
                };
                yield return response;
            }
        }
    }
}
