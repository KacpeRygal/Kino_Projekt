using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IUserService
    {
        UserResponseDTO GetUser(int id);
        void DeleteUser(int id);
        void PutTickPutUser(int id, UserRequestDTO userRequestDTO);
        void PostScreening(UserRequestDTO userRequestDTO);
    }
}
