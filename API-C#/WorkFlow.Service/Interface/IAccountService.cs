using Common.DTO;
using WorkFlow.Domain.Enum;
using WorkFlow.Domain.Identity;

namespace WorkFlow.Service.Interface
{
    public interface IAccountService
    {
        Task<ResponseDTO> CreateUser(UserDTO user);
        Task<ResponseDTO> UpdateUser(int id, UserDTO user);
        Task<ResponseDTO> RemoveUser(int id);
        Task<ResponseDTO> AddUserInRole(User user, RoleName role);
        Task<ResponseDTO> RemoveUserInRole(User user, RoleName role);
        Task<ResponseDTO> GetUserByUserNameAsync(string userName);
        Task<ResponseDTO> Login(UserLoginDTO userDTO);
    }
}