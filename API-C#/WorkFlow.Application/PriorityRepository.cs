using Common.DataAccess;
using WorkFlow.Application.Interface;
using WorkFlow.Domain;
using WorkFlow.Persistence;

namespace WorkFlow.Application
{
    public class PriorityRepository : BaseRepository<Priority, WorkFlowContext>, IPriorityRepository
    {
        public PriorityRepository(WorkFlowContext context) : base(context)
        {
        }
    }
}
