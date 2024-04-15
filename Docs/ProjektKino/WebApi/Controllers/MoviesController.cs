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
        public void Post([FromQuery] MovieRequestDTO movieRequestDTO)
        {
            this.movieService.PostMovie(movieRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.movieService.DeleteMovie(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromQuery] MovieRequestDTO movieRequestDTO)
        {
            this.movieService.PutMovie(id, movieRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public MovieResponseDTO GetMovie([FromQuery]  int id)
        {
            return this.movieService.GetMovie(id);
        }

        [HttpGet]
        [Route("get2/")]
        public IEnumerable<MovieResponseDTO> GetMovies()
        {
            return this.movieService.GetMovies();
        }

        [HttpGet]
        [Route("get3/{id}")]
        public IEnumerable<OpinionResponseDTO> GetOpinions([FromQuery] int id)
        {
            return this.movieService.GetOpinions(id);
        }

        [HttpGet]
        [Route("get4/{id}")]
        public IEnumerable<ScreeningResponseDTO> GetScreenings([FromQuery] int id)
        {
            return this.movieService.GetScreenings(id);
        }
    }
}