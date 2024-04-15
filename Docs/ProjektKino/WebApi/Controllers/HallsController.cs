using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HallsController : ControllerBase
    {
        readonly IHallService hallService;
        public HallsController(IHallService hallService) { this.hallService = hallService; }

        [HttpPost]
        public void Post([FromQuery] HallRequestDTO hallRequestDTO)
        {
            this.hallService.PostHall(hallRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.hallService.DeleteHall(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] HallRequestDTO hallRequestDTO)
        {
            this.hallService.PutHall(id, hallRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public HallResponseDTO GetHall([FromQuery] int id)
        {
            return this.hallService.GetHall(id);
        }

        [HttpGet]
        [Route("get2/")]
        public IEnumerable<HallResponseDTO> GetHalls()
        {
            return this.hallService.GetHalls();
        }
    }
}