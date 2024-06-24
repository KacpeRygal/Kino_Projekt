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
            if (movie == null) return null;

            MovieResponseDTO response = new MovieResponseDTO
            {
                ID = movie.ID,
                Time = movie.Time,
                Language = movie.Language,
                Score = movie.Score,
                Name = movie.Name,
            };
            return response;
        }

        public IEnumerable<MovieResponseDTO> GetMovies()
        {
            var movies = dbContext.Movie;
            for(int i=0;i < movies.Count();i++)
            {
                Movie movie = movies.ElementAt(i);
                MovieResponseDTO r = new MovieResponseDTO
                {
                    ID = movie.ID,
                    Time = movie.Time,
                    Language = movie.Language,
                    Score = movie.Score,
                    Name = movie.Name,
                };
                yield return r;
            }
        }

        public IEnumerable<OpinionResponseDTO> GetOpinions(int id)
        {
            var opinions = dbContext.Opinion.Where(x => x.MovieID == id);

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

        public IEnumerable<ScreeningResponseDTO> GetScreenings(int id)
        {
            IEnumerable<ScreeningResponseDTO> responseDTOs = new List<ScreeningResponseDTO>();
            var screenings = dbContext.Screening.Where(x=> x.MovieID == id);
            for(int i = 0; i < screenings.Count(); i++)
            {
                Screening sc = screenings.ElementAt(i);
                ScreeningResponseDTO response = new ScreeningResponseDTO
                {
                    ID = sc.ID,
                    HallID = sc.HallID,
                    MovieID = sc.MovieID,
                    Date = sc.Date,
                };
                yield return response;
            } 
        }

        public void PostMovie(MovieRequestDTO movieRequestDTO)
        {
            Movie movie = new()
            {
                Time = movieRequestDTO.Time,
                Language = movieRequestDTO.Language,
                Name = movieRequestDTO.Name,
                Score = movieRequestDTO.Score,
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
            dbContext.SaveChanges();
        }
    }
}
