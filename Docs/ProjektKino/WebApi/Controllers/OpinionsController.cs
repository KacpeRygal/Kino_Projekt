using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OpinionsController : ControllerBase
    {
        readonly IOpinionService opinionService;
        public OpinionsController(IOpinionService opinionService) { this.opinionService = opinionService; }

        [HttpPost]
        public void Post([FromQuery] OpinionRequestDTO opinionRequestDTO)
        {
            this.opinionService.PostOpinion(opinionRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.opinionService.DeleteOpinion(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] OpinionRequestDTO opinionRequestDTO)
        {
            this.opinionService.PutOpinion(id, opinionRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public OpinionResponseDTO GetHall([FromQuery] int id)
        {
            return this.opinionService.GetOpinion(id);
        }

    }
}
