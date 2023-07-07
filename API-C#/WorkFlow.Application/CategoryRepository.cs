using Common.DataAccess;
using WorkFlow.Application.Interface;
using WorkFlow.Domain;
using WorkFlow.Persistence;

namespace WorkFlow.Application
{
    public class CategoryRepository : BaseRepository<Category, WorkFlowContext>, ICategoryRepository
    {
        public CategoryRepository(WorkFlowContext context) : base(context)
        {
        }
    }
}
