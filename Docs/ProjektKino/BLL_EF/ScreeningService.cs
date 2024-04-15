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
                Hall = screening.Hall,
                HallID = screening.HallID,
                Movie = screening.Movie,
                MovieID = screening.MovieID,
                Tickets = screening.Tickets,
            };
            return response;
        }

        public void PostScreening(ScreeningRequestDTO screeningRequestDTO)
        {
            Screening screening = new()
            {
                Date = screeningRequestDTO.Date,
                Hall = screeningRequestDTO.Hall,
                HallID = screeningRequestDTO.HallID,
                Movie = screeningRequestDTO.Movie,
                MovieID = screeningRequestDTO.MovieID,
                Tickets = screeningRequestDTO.Tickets,
            };
            dbContext.Screening.Add(screening);
            dbContext.SaveChanges();
        }

        public void PutScreening(int id, ScreeningRequestDTO screeningRequestDTO)
        {
            Screening screening = dbContext.Screening.Find(id);
            screening.Date = screeningRequestDTO.Date;
            screening.Hall = screeningRequestDTO.Hall;
            screening.HallID = screeningRequestDTO.HallID;
            screening.Movie = screeningRequestDTO.Movie;
            screening.MovieID = screeningRequestDTO.MovieID;
            screening.Tickets = screeningRequestDTO.Tickets;
            dbContext.SaveChanges();
        }
    }
}
