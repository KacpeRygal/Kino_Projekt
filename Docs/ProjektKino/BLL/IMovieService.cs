using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IMovieService
    {
        IEnumerable<MovieResponseDTO> GetMovies();
        MovieResponseDTO GetMovie(int id);
        IEnumerable<OpinionResponseDTO> GetOpinions(int id);
        IEnumerable<ScreeningResponseDTO> GetScreenings(int id);
        void DeleteMovie(int id);
        void PutMovie(int id, MovieRequestDTO movieRequestDTO);
        void PostMovie(MovieRequestDTO movieRequestDTO);
    }
}
