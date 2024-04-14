using BLL;
using BLL.DTO;
using DAL;
using Microsoft.EntityFrameworkCore;
using Model;

namespace BLL_EF
{
    public class MovieService : IMovieService
    {
        private CinemaContext dbContext;
        public MovieService(CinemaContext dbContext) { this.dbContext = dbContext; }
        public void DeleteMovie(int id)
        {
            Movie movie = dbContext.Movie.Find(id);
            dbContext.Movie.Remove(movie);
            dbContext.SaveChanges();
        }

        public MovieResponseDTO GetMovie(int id)
        {
            Movie movie = dbContext.Movie.Find(id);
            MovieResponseDTO response = new MovieResponseDTO
            {
                ID = movie.ID,
                Time = movie.Time,
                Language = movie.Language,
                Score = movie.Score,
                Screenings = movie.Screenings,
                Name = movie.Name,
                Opinions = movie.Opinions
            };
            return response;
        }

        public IEnumerable<MovieResponseDTO> GetMovies()
        {
            IEnumerable<MovieResponseDTO> responseDTOs = new List<MovieResponseDTO>();
            for(int i=0;i < dbContext.Movie.Count();i++)
            {
                Movie movie = dbContext.Movie.ElementAt(i);
                MovieResponseDTO r = new MovieResponseDTO
                {
                    ID = movie.ID,
                    Time = movie.Time,
                    Language = movie.Language,
                    Score = movie.Score,
                    Screenings = movie.Screenings,
                    Name = movie.Name,
                    Opinions = movie.Opinions
                };
                responseDTOs.Append(r);
            }
            return responseDTOs;
        }

        public IEnumerable<OpinionResponseDTO> GetOpinions(int id)
        {
            IEnumerable<OpinionResponseDTO> responseDTOs = new List<OpinionResponseDTO>();
            for (int i = 0; i < dbContext.Movie.Find(id).Opinions.Count(); i++)
            {
                Opinion sc = dbContext.Movie.Find(id).Opinions.ElementAt(i);
                OpinionResponseDTO response = new OpinionResponseDTO
                {
                    ID = sc.ID,
                    UserID = sc.UserID,
                    MovieID = sc.MovieID,
                    Value = sc.Value,
                    Content = sc.Content,
                    User = sc.User,
                    Movie = sc.Movie,
                };
                responseDTOs.Append(response);
            }
            return responseDTOs;
        }

        public IEnumerable<ScreeningResponseDTO> GetScreenings(int id)
        {
            IEnumerable<ScreeningResponseDTO> responseDTOs = new List<ScreeningResponseDTO>();
            for(int i = 0; i < dbContext.Movie.Find(id).Screenings.Count(); i++)
            {
                Screening sc = dbContext.Movie.Find(id).Screenings.ElementAt(i);
                ScreeningResponseDTO response = new ScreeningResponseDTO
                {
                    ID = sc.ID,
                    HallID = sc.HallID,
                    MovieID = sc.MovieID,
                    Date = sc.Date,
                    Hall = sc.Hall,
                    Movie = sc.Movie,
                    Tickets = sc.Tickets,
                };
                responseDTOs.Append(response);
            }
            return responseDTOs;
        }

        public void PostMovie(MovieRequestDTO movieRequestDTO)
        {
            Movie movie = new()
            {
                Time = movieRequestDTO.Time,
                Language = movieRequestDTO.Language,
                Name = movieRequestDTO.Name,
                Score = movieRequestDTO.Score,
                Opinions = movieRequestDTO.Opinions,
                Screenings = movieRequestDTO.Screenings
            };
            dbContext.Movie.Add(movie);
            dbContext.SaveChanges();
        }

        public void PutMovie(int id, MovieRequestDTO movieRequestDTO)
        {
            Movie movie = dbContext.Movie.Find(id);
            movie.Time = movieRequestDTO.Time;
            movie.Language = movieRequestDTO.Language;
            movie.Name = movieRequestDTO.Name;
            movie.Score = movieRequestDTO.Score;
            movie.Screenings = movieRequestDTO.Screenings;
            movie.Opinions = movieRequestDTO.Opinions;
            dbContext.SaveChanges();
        }
    }
}
