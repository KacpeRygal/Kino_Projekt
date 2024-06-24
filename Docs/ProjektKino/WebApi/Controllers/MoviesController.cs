using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        readonly IMovieService movieService;
        public MoviesController(IMovieService movieService) { this.movieService = movieService; }

        [HttpPost]
        public void Post([FromBody] MovieRequestDTO movieRequestDTO)
        {
            this.movieService.PostMovie(movieRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.movieService.DeleteMovie(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] MovieRequestDTO movieRequestDTO)
        {
            this.movieService.PutMovie(id, movieRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public MovieResponseDTO GetMovie(int id)
        {
            return this.movieService.GetMovie(id);
        }

        [HttpGet]
        [Route("getMovies/")]
        public IEnumerable<MovieResponseDTO> GetMovies()
        {
            return this.movieService.GetMovies();
        }

        [HttpGet]
        [Route("getOpinions/{id}")]
        public IEnumerable<OpinionResponseDTO> GetOpinions(int id)
        {
            return this.movieService.GetOpinions(id);
        }

        [HttpGet]
        [Route("getScreenings/{id}")]
        public IEnumerable<ScreeningResponseDTO> GetScreenings(int id)
        {
            return this.movieService.GetScreenings(id);
        }
    }
}