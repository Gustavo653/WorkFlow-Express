
using Common.DTO;

namespace WorkFlow.Service.Interface
{
    public interface ITokenService
    {
        Task<string> CreateToken(UserDTO userDTO);
    }
}