using Common.DataAccess;
using WorkFlow.Application.Interface;
using WorkFlow.Domain.Identity;
using WorkFlow.Persistence;

namespace WorkFlow.Application
{
    public class UserRepository : BaseRepository<User, WorkFlowContext>, IUserRepository
    {
        public UserRepository(WorkFlowContext context) : base(context)
        {
        }
    }
}
