using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkFlow.Domain.Enum;
using WorkFlow.DTO;
using WorkFlow.Service.Interface;

namespace WorkFlow.API.Controllers
{
    public class PriorityController : BaseController
    {
        private readonly IPriorityService _priorityService;

        public PriorityController(IPriorityService priorityService)
        {
            _priorityService = priorityService;
        }

        [HttpPost("")]
        [Authorize(Roles = nameof(RoleName.Admin))]
        public async Task<IActionResult> CreatePriority([FromBody] BasicDTO name)
        {
            var priority = await _priorityService.CreatePriority(name);
            return StatusCode(priority.Code, priority);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(RoleName.Admin))]
        public async Task<IActionResult> UpdatePriority([FromRoute] int id, [FromBody] BasicDTO name)
        {
            var priority = await _priorityService.UpdatePriority(id, name);
            return StatusCode(priority.Code, priority);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(RoleName.Admin))]
        public async Task<IActionResult> RemovePriority([FromRoute] int id)
        {
            var priority = await _priorityService.RemovePriority(id);
            return StatusCode(priority.Code, priority);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetPriorities()
        {
            var priority = await _priorityService.GetPriorities();
            return StatusCode(priority.Code, priority);
        }
    }
}