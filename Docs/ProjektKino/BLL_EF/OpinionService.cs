using BLL;
using BLL.DTO;
using DAL;
using Model;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class OpinionService : IOpinionService
    {
        private CinemaContext dbContext;
        public OpinionService(CinemaContext dbContext) { this.dbContext = dbContext; }

        public void DeleteOpinion(int id)
        {
            Opinion opinion = dbContext.Opinion.Find(id);
            dbContext.Opinion.Remove(opinion);
            dbContext.SaveChanges();
        }

        public OpinionResponseDTO GetOpinion(int id)
        {
            Opinion opinion = dbContext.Opinion.Find(id);
            if (opinion == null) return null;

            OpinionResponseDTO response = new OpinionResponseDTO
            {
                ID = opinion.ID,
                UserID = opinion.UserID,
                MovieID = opinion.MovieID,
                Content = opinion.Content,
                Value = opinion.Value 
            };
            return response;
        }

        public void PostOpinion(OpinionRequestDTO opinionRequestDTO)
        {
            Opinion opinion = new()
            {
                UserID = opinionRequestDTO.UserID,
                MovieID = opinionRequestDTO.MovieID,
                Content = opinionRequestDTO.Content,
                Value = opinionRequestDTO.Value
            };
            dbContext.Opinion.Add(opinion);
            dbContext.Movie.Find(opinion.MovieID).Score += opinion.Value;//calculate at client
            dbContext.SaveChanges();
        }

        public void PutOpinion(int id, OpinionRequestDTO opinionRequestDTO)
        {
            Opinion opinion = dbContext.Opinion.Find(id);
            opinion.UserID = opinionRequestDTO.UserID;
            opinion.MovieID = opinionRequestDTO.MovieID;
            opinion.Content = opinionRequestDTO.Content;
            opinion.Value = opinionRequestDTO.Value;
            dbContext.SaveChanges();
        }
    }
}
