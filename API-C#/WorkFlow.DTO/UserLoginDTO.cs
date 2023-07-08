using System.ComponentModel.DataAnnotations;

namespace WorkFlow.DTO
{
    public class UserLoginDTO
    {
        [Required]
        public string UserName { get; set; } = null!;
        [Required]
        public string Password { get; set; } = null!;
    }
}