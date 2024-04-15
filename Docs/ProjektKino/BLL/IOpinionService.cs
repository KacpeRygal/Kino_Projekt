using BLL.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLL
{
    public interface IOpinionService
    {
        OpinionResponseDTO GetOpinion(int id);
        void DeleteOpinion(int id);
        void PutOpinion(int id, OpinionRequestDTO opinionRequestDTO);
        void PostOpinion(OpinionRequestDTO opinionRequestDTO);
    }
}
