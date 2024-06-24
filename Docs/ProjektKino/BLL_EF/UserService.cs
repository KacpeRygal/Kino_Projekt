using BLL;
using BLL.DTO;
using DAL;
using Microsoft.Extensions.Options;
using Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL_EF
{
    public class UserService : IUserService
    {
        private CinemaContext dbContext;
        public UserService(CinemaContext dbContext) { this.dbContext = dbContext; }

        public void DeleteUser(int id)
        {
            User user = dbContext.User.Find(id);
            dbContext.User.Remove(user);
            dbContext.SaveChanges();
        }

        public UserResponseDTO GetUser(int id)
        {
            User user = dbContext.User.Find(id);
            if (user == null) return null;

            UserResponseDTO response = new UserResponseDTO
            {
                ID = user.ID,
                Login = user.Login,
                Password = user.Password,
                Type = user.Type,
                Name = user.Name,
                CanReduce = user.CanReduce,
            };
            return response;
        }

        public void PostUser(UserRequestDTO userRequestDTO)
        {
            User user = new()
            {
                Login = userRequestDTO.Login,
                Password = userRequestDTO.Password,
                Type = userRequestDTO.Type,
                Name = userRequestDTO.Name,
                CanReduce = userRequestDTO.CanReduce,
            };
            dbContext.User.Add(user);
            dbContext.SaveChanges();
        }

        public void PutUser(int id, UserRequestDTO userRequestDTO)
        {
            User user = dbContext.User.Find(id);
            user.Login = userRequestDTO.Login;
            user.Password = userRequestDTO.Password;
            user.Type = userRequestDTO.Type;
            user.Name = userRequestDTO.Name;
            user.CanReduce = userRequestDTO.CanReduce;
            dbContext.SaveChanges();
        }

        public IEnumerable<TicketResponseDTO> GetTickets(int id) 
        {
            var opinions = dbContext.Ticket.Where(x => x.UserID == id);

            for (int i = 0; i < opinions.Count(); i++)
            {
                Ticket sc = opinions.ElementAt(i);
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

        public IEnumerable<OpinionResponseDTO> GetOpinions(int id)
        {
            var opinions = dbContext.Opinion.Where(x => x.UserID == id);

            for (int i = 0; i < opinions.Count(); i++)
            {
                Opinion sc = opinions.ElementAt(i);
                OpinionResponseDTO response = new OpinionResponseDTO
                {
                    ID = sc.ID,
                    UserID = sc.UserID,
                    MovieID = sc.MovieID,
                    Value = sc.Value,
                    Content = sc.Content,
                };
                yield return response;
            }
        }
    }
}
