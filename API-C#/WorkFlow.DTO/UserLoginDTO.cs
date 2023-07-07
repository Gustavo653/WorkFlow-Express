using System.ComponentModel.DataAnnotations;

namespace WorkFlow.DTO
{
    public class UserLoginDTO
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}