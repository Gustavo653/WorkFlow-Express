using System.ComponentModel.DataAnnotations;
using WorkFlow.Domain.Enum;

namespace WorkFlow.DTO
{
    public class UserDTO
    {
        [Required]
        public required string UserName { get; set; }
        [Required]
        [EmailAddress]
        public required string Email { get; set; }
        [Required]
        public required string Password { get; set; }
        [Required]
        public required string Name { get; set; }
        [Required]
        public required List<RoleName> Roles { get; set; }
    }
}