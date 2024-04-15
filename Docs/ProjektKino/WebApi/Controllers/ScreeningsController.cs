using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScreeningsController : ControllerBase
    {
        readonly IScreeningService screeningService;
        public ScreeningsController(IScreeningService screeningService) { this.screeningService = screeningService; }

        [HttpPost]
        public void Post([FromQuery] ScreeningRequestDTO screeningRequestDTO)
        {
            this.screeningService.PostScreening(screeningRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.screeningService.DeleteScreening(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ScreeningRequestDTO screeningRequestDTO)
        {
            this.screeningService.PutScreening(id, screeningRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public ScreeningResponseDTO GetHall([FromQuery] int id)
        {
            return this.screeningService.GetScreening(id);
        }

    }
}