using Common.DTO;
using WorkFlow.DTO;

namespace WorkFlow.Service.Interface
{
    public interface IAccountService
    {
        Task<ResponseDTO> CreateUser(UserDTO userDTO);
        Task<ResponseDTO> UpdateUser(int id, UserDTO userDTO);
        Task<ResponseDTO> RemoveUser(int id);
        Task<ResponseDTO> GetUsers();
        Task<ResponseDTO> GetCurrent(string email);
        Task<ResponseDTO> Login(UserLoginDTO userLoginDTO);
    }
}