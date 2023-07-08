using Common.DTO;
using WorkFlow.DTO;

namespace WorkFlow.Service.Interface
{
    public interface IStatusService
    {
        Task<ResponseDTO> CreateStatus(BasicDTO basicDTO);
        Task<ResponseDTO> UpdateStatus(int id, BasicDTO basicDTO);
        Task<ResponseDTO> RemoveStatus(int id);
        Task<ResponseDTO> GetStatuses();
    }
}