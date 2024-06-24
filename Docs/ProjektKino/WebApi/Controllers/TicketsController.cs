using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        readonly ITicketService ticketService;
        public TicketsController(ITicketService ticketService) { this.ticketService = ticketService; }

        [HttpPost]
        public void Post([FromBody] TicketRequestDTO ticketRequestDTO)
        {
            this.ticketService.PostTicket(ticketRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.ticketService.DeleteTicket(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TicketRequestDTO ticketRequestDTO)
        {
            this.ticketService.PutTicket(id, ticketRequestDTO);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public TicketResponseDTO GetTicket(int id)
        {
            return this.ticketService.GetTicket(id);
        }

        [HttpGet]
        [Route("getSeats/{id}")]
        public IEnumerable<SeatResponseDTO> GetSeats(int id)
        {
            return this.ticketService.GetSeats(id);
        }
    }
}

