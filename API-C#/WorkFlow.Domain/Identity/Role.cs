using Microsoft.AspNetCore.Identity;

namespace WorkFlow.Domain.Identity
{
    public class Role : IdentityRole<long>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}