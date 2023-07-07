using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WorkFlow.Domain;
using WorkFlow.Domain.Identity;

namespace WorkFlow.Persistence
{
    public class WorkFlowContext : IdentityDbContext<User, Role, int,
                                               IdentityUserClaim<int>, UserRole, IdentityUserLogin<int>,
                                               IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public WorkFlowContext(DbContextOptions<WorkFlowContext> options) : base(options) { }

        protected WorkFlowContext()
        {
        }

        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Category>(x =>
            {
                x.HasIndex(a => a.Name).IsUnique();
            });

            modelBuilder.Entity<User>(x =>
            {
                x.HasIndex(y => y.Email).IsUnique();
            });

            modelBuilder.Entity<UserRole>(userRole =>
            {
                userRole.HasKey(ur => new { ur.UserId, ur.RoleId });

                userRole.HasOne(ur => ur.Role)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.RoleId)
                    .IsRequired();

                userRole.HasOne(ur => ur.User)
                    .WithMany(r => r.UserRoles)
                    .HasForeignKey(ur => ur.UserId)
                    .IsRequired();
            }
           );
        }
    }
}
