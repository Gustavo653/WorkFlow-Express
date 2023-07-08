using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WorkFlow.Domain.Enum;
using WorkFlow.DTO;
using WorkFlow.Service.Interface;

namespace WorkFlow.API.Controllers
{
    public class StatusController : BaseController
    {
        private readonly IStatusService _statusService;

        public StatusController(IStatusService statusService)
        {
            _statusService = statusService;
        }

        [HttpPost("")]
        [Authorize(Roles = nameof(RoleName.Admin))]
        public async Task<IActionResult> CreateStatus([FromBody] BasicDTO name)
        {
            var status = await _statusService.CreateStatus(name);
            return StatusCode(status.Code, status);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = nameof(RoleName.Admin))]
        public async Task<IActionResult> UpdateStatus([FromRoute] int id, [FromBody] BasicDTO name)
        {
            var status = await _statusService.UpdateStatus(id, name);
            return StatusCode(status.Code, status);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = nameof(RoleName.Admin))]
        public async Task<IActionResult> RemoveStatus([FromRoute] int id)
        {
            var status = await _statusService.RemoveStatus(id);
            return StatusCode(status.Code, status);
        }

        [HttpGet("")]
        public async Task<IActionResult> GetStatuses()
        {
            var status = await _statusService.GetStatuses();
            return StatusCode(status.Code, status);
        }
    }
}