using System.ComponentModel.DataAnnotations;

namespace WorkFlow.DTO
{
    public class BasicDTO
    {
        [Required]
        public required string Name { get; set; }
    }
}