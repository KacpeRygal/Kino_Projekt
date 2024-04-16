using Microsoft.AspNetCore.Mvc;
using BLL_EF;
using BLL;
using BLL.DTO;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        readonly IUserService userService;
        public UsersController(IUserService userService) { this.userService = userService; }

        [HttpPost]
        public void Post([FromQuery] UserRequestDTO userRequestDTO)
        {
            this.userService.PostUser(userRequestDTO);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            this.userService.DeleteUser(id);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] UserRequestDTO userRequest)
        {
            this.userService.PutUser(id, userRequest);
        }

        [HttpGet]
        [Route("get1/{id}")]
        public UserResponseDTO GetHall([FromQuery] int id)
        {
            return this.userService.GetUser(id);
        }
    }
}
