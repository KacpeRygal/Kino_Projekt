using BLL;
using BLL.DTO;
using DAL;
using Microsoft.EntityFrameworkCore;
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
                Screenings = hall.Screenings,
                Seats = hall.Seats
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
                    Screenings = hall.Screenings,
                    Seats = hall.Seats
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
                Screenings = hallRequestDTO.Screenings,
                Seats = hallRequestDTO.Seats
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
            hall.Screenings = hallRequestDTO.Screenings;
            hall.Seats = hallRequestDTO.Seats;
            dbContext.SaveChanges();
        }
    }
}
