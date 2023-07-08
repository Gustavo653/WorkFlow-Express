using Common.DTO;
using WorkFlow.DTO;

namespace WorkFlow.Service.Interface
{
    public interface ICategoryService
    {
        Task<ResponseDTO> CreateCategory(BasicDTO basicDTO);
        Task<ResponseDTO> UpdateCategory(int id, BasicDTO basicDTO);
        Task<ResponseDTO> RemoveCategory(int id);
        Task<ResponseDTO> GetCategories();
    }
}