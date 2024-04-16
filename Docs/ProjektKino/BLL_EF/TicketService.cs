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
                User = ticket.User,
                UserID = ticket.UserID,
                Date = ticket.Date,
                Screening = ticket.Screening,
                ScreeningID = ticket.ScreeningID,
                Seats = ticket.Seats,
                Price = ticket.Price
            };
            return response;
        }

        public void PostTicket(TicketRequestDTO ticketRequestDTO)
        {
            Ticket ticket = new()
            {
                User = ticketRequestDTO.User,
                UserID = ticketRequestDTO.UserID,
                Date = ticketRequestDTO.Date,
                Screening = ticketRequestDTO.Screening,
                ScreeningID = ticketRequestDTO.ScreeningID,
                Seats = ticketRequestDTO.Seats,
                Price = ticketRequestDTO.Price
            };
            dbContext.Ticket.Add(ticket);
            dbContext.SaveChanges();
        }

        public void PutTicket(int id, TicketRequestDTO ticketRequestDTO)
        {
            Ticket ticket = dbContext.Ticket.Find(id);
            ticket.User = ticketRequestDTO.User;
            ticket.UserID = ticketRequestDTO.UserID;
            ticket.Date = ticketRequestDTO.Date;
            ticket.Screening = ticketRequestDTO.Screening;
            ticket.ScreeningID = ticketRequestDTO.ScreeningID;
            ticket.Seats = ticketRequestDTO.Seats;
            ticket.Price = ticketRequestDTO.Price;
            dbContext.SaveChanges();
        }
    }
}
