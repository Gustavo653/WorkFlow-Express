using Microsoft.AspNetCore.Identity;

namespace WorkFlow.Domain.Identity
{
    public class UserRole : IdentityUserRole<long>
    {
        public User User { get; set; }
        public Role Role { get; set; }
    }
}