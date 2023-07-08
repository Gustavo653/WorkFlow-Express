using Common.DataAccess;
using WorkFlow.Application.Interface;
using WorkFlow.Domain;
using WorkFlow.Persistence;

namespace WorkFlow.Application
{
    public class StatusRepository : BaseRepository<Status, WorkFlowContext>, IStatusRepository
    {
        public StatusRepository(WorkFlowContext context) : base(context)
        {
        }
    }
}
