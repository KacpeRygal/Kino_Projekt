using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeatsController : ControllerBase
    {
        readonly ISeatService seatService;
        public SeatsController(ISeatService seatService) { this.seatService = seatService; }

        [HttpPost]
        public void Post([FromQuery] SeatRequestDTO seatRequestDTO)
        {
            this.seatService.PostSeat(seatRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.seatService.DeleteSeat(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] SeatRequestDTO seatRequestDTO)
        {
            this.seatService.PutSeat(id, seatRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public SeatResponseDTO GetHall([FromQuery] int id)
        {
            return this.seatService.GetSeat(id);
        }

    }
}
