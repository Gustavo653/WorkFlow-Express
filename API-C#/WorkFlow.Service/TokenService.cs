using AutoMapper;
using Common.DTO;
using WorkFlow.Domain.Identity;
using WorkFlow.Service.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace WorkFlow.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        public readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config,
                            UserManager<User> userManager,
                            IMapper mapper)
        {
            _config = config;
            _userManager = userManager;
            _mapper = mapper;
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"] ?? "TokenKey"));
        }
        public async Task<string> CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email!),
            };

            var roles = await _userManager.GetRolesAsync(user);

            claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescription = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescription);

            return tokenHandler.WriteToken(token);
        }
    }
}