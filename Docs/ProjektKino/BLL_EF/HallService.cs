using BLL;
using BLL.DTO;
using DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class HallService : IHallService
    {
        private CinemaContext dbContext;
        public HallService(CinemaContext dbContext) { this.dbContext = dbContext; }
        public void DeleteHall(int id)
        {
            Hall hall = dbContext.Hall.Find(id);
            dbContext.Hall.Remove(hall);
            dbContext.SaveChanges();
        }

        public HallResponseDTO GetHall(int id)
        {
            Hall hall = dbContext.Hall.Find(id);
            HallResponseDTO response = new HallResponseDTO
            {
                ID = hall.ID,
                Rows = hall.Rows,
                Columns = hall.Columns,
                Full = hall.Full,
                Technology = hall.Technology,
            };
            return response;
        }

        public IEnumerable<HallResponseDTO> GetHalls()
        {
            IEnumerable<HallResponseDTO> responseDTOs = new List<HallResponseDTO>();
            for (int i = 0; i < dbContext.Hall.Count(); i++)
            {
                Hall hall = dbContext.Hall.ElementAt(i);
                HallResponseDTO r = new HallResponseDTO
                {
                    ID = hall.ID,
                    Rows = hall.Rows,
                    Columns = hall.Columns,
                    Full = hall.Full,
                    Technology = hall.Technology,
                };
                responseDTOs.Append(r);
            }
            return responseDTOs;
        }

        public void PostHall(HallRequestDTO hallRequestDTO)
        {
            Hall hall = new Hall
            {
                Rows = hallRequestDTO.Rows,
                Columns = hallRequestDTO.Columns,
                Full = hallRequestDTO.Full,
                Technology = hallRequestDTO.Technology,
            };
            dbContext.Hall.Add(hall);
            dbContext.SaveChanges();
        }

        public void PutHall(int id, HallRequestDTO hallRequestDTO)
        {
            Hall hall = dbContext.Hall.Find(id);
            hall.Rows = hallRequestDTO.Rows;
            hall.Columns = hallRequestDTO.Columns;
            hall.Full = hallRequestDTO.Full;
            hall.Technology = hallRequestDTO.Technology;
            dbContext.SaveChanges();
        }

        public IEnumerable<ScreeningResponseDTO> GetScreenings(int id) 
        {
            var screenings = dbContext.Screening.Where(x=>x.HallID == id);
            for (int i = 0; i < screenings.Count(); i++)
            {
                Screening sc = screenings.ElementAt(i);
                ScreeningResponseDTO response = new ScreeningResponseDTO
                {
                    ID = sc.ID,
                    HallID = sc.HallID,
                    MovieID = sc.MovieID,
                    Date = sc.Date
                };
                yield return response;
            }
        }

        public IEnumerable<SeatResponseDTO> GetSeats(int id)
        {
            var seats = dbContext.Seat.Where(x=>x.HallID == id);
            for (int i = 0; i < seats.Count(); i++)
            {
                Seat sc = seats.ElementAt(i);
                SeatResponseDTO response = new SeatResponseDTO
                {
                    ID = sc.ID,
                    HallID = sc.HallID,
                    TicketID = sc.TicketID,
                    Row = sc.Row,
                    Column = sc.Column,
                    Occupied = sc.Occupied
                };
                yield return response;
            }
        }
    }
}
