using Microsoft.AspNetCore.Identity;

namespace WorkFlow.Domain.Identity
{
    public class Role : IdentityRole<int>
    {
        public List<UserRole> UserRoles { get; set; }
    }
}