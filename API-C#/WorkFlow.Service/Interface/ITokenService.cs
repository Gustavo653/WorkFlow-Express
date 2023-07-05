
using WorkFlow.Domain.Identity;

namespace WorkFlow.Service.Interface
{
    public interface ITokenService
    {
        Task<string> CreateToken(User userDTO);
    }
}