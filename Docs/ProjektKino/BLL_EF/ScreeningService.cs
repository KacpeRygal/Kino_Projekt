using BLL;
using BLL.DTO;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace BLL_EF
{
    public class ScreeningService : IScreeningService
    {
        private CinemaContext dbContext;
        public ScreeningService(CinemaContext dbContext) { this.dbContext = dbContext; }
        public void DeleteScreening(int id)
        {
            Screening screening = dbContext.Screening.Find(id);
            dbContext.Screening.Remove(screening);
            dbContext.SaveChanges();
        }

        public ScreeningResponseDTO GetScreening(int id)
        {
            Screening screening = dbContext.Screening.Find(id);
            if (screening == null) return null;

            ScreeningResponseDTO response = new ScreeningResponseDTO
            {
                ID = screening.ID,
                Date = screening.Date,
                HallID = screening.HallID,
                MovieID = screening.MovieID,
            };
            return response;
        }

        public IEnumerable<ScreeningResponseDTO> GetScreenings() 
        {
            var screens = dbContext.Screening;
            for (int i = 0; i < screens.Count(); i++)
            {
                Screening sc = screens.ElementAt(i);
                ScreeningResponseDTO r = new ScreeningResponseDTO
                {
                    ID = sc.ID,  
                    MovieID = sc.MovieID,
                    HallID = sc.HallID,
                    Date = sc.Date,
                };
                yield return r;
            }
        }

        public void PostScreening(ScreeningRequestDTO screeningRequestDTO)
        {
            Screening screening = new()
            {
                Date = screeningRequestDTO.Date,
                HallID = screeningRequestDTO.HallID,
                MovieID = screeningRequestDTO.MovieID,
            };
            dbContext.Screening.Add(screening);
            dbContext.SaveChanges();
        }

        public void PutScreening(int id, ScreeningRequestDTO screeningRequestDTO)
        {
            Screening screening = dbContext.Screening.Find(id);
            screening.Date = screeningRequestDTO.Date;
            screening.HallID = screeningRequestDTO.HallID;
            screening.MovieID = screeningRequestDTO.MovieID;
            dbContext.SaveChanges();
        }

        public IEnumerable<TicketResponseDTO> GetTickets(int id)
        {
            var tickets = dbContext.Ticket.Where(x => x.ScreeningID == id);

            for (int i = 0; i < tickets.Count(); i++)
            {
                Ticket sc = tickets.ElementAt(i);
                TicketResponseDTO response = new TicketResponseDTO
                {
                    ID = sc.ID,
                    UserID = sc.UserID,
                    ScreeningID = sc.ScreeningID,
                    Date = sc.Date,
                    Price = sc.Price
                };
                yield return response;
            }
        }
    }
}
