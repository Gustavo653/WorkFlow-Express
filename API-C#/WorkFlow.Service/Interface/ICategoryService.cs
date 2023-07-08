using Common.DTO;
using WorkFlow.DTO;

namespace WorkFlow.Service.Interface
{
    public interface IPriorityService
    {
        Task<ResponseDTO> CreatePriority(BasicDTO basicDTO);
        Task<ResponseDTO> UpdatePriority(int id, BasicDTO basicDTO);
        Task<ResponseDTO> RemovePriority(int id);
        Task<ResponseDTO> GetPriorities();
    }
}