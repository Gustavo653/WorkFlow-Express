using AutoMapper;
using Common.DTO;
using Common.Functions;
using WorkFlow.Application.Interface;
using WorkFlow.Domain.Enum;
using WorkFlow.Domain.Identity;
using WorkFlow.Service.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace WorkFlow.Service
{
    public class AccountService : IAccountService
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IMapper _mapper;
        private readonly IUserRepository _userRepository;
        private readonly ITokenService _tokenService;
        public AccountService(UserManager<User> userManager,
                              SignInManager<User> signInManager,
                              IMapper mapper,
                              IUserRepository userRepository,
                              ITokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _mapper = mapper;
            _userRepository = userRepository;
            _tokenService = tokenService;
        }

        private async Task<SignInResult> CheckUserPassword(UserLoginDTO userLoginDTO)
        {
            try
            {
                var user = await GetUserByEmail(userLoginDTO.Email);
                return await _signInManager.CheckPasswordSignInAsync(user, userLoginDTO.Password, false);
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao verificar senha do usuário. Erro: {ex.Message}");
            }
        }

        private async Task<User> GetUserByEmail(string email)
        {
            try
            {
                return await _userRepository.GetEntities()
                                            .FirstOrDefaultAsync(x => x.Email == email) ??
                                            throw new Exception($"Usuário '{email}' não encontrado!");
            }
            catch (Exception ex)
            {
                throw new Exception($"Erro ao obter o usuário. Erro: {ex.Message}");
            }
        }

        public async Task<ResponseDTO> Login(UserLoginDTO userDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var user = await GetUserByEmail(userDTO.Email);
                var password = await CheckUserPassword(userDTO);
                if (user != null && password.Succeeded)
                {
                    responseDTO.Object = new
                    {
                        userName = user.UserName,
                        email = user.Email,
                        token = await _tokenService.CreateToken(user)
                    };
                }
                else
                    responseDTO.Code = 401;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> GetUserByUserNameAsync(string userName)
        {
            ResponseDTO responseDTO = new();
            try
            {
                responseDTO.Object = await GetUserByEmail(userName);
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> CreateUser(UserDTO userDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var user = await _userManager.FindByEmailAsync(userDTO.Email);
                if (user != null) throw new Exception("Este usuário já existe!");
                var userEntity = new User();
                PropertyCopier<UserDTO, User>.Copy(userDTO, userEntity);
                await _userManager.CreateAsync(userEntity, userDTO.Password);
                responseDTO.Object = userEntity;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> UpdateUser(int id, UserDTO user)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var userEntity = await _userManager.FindByIdAsync(id.ToString()) ?? throw new Exception("Usuário não encotrado!");
                PropertyCopier<UserDTO, User>.Copy(user, userEntity);
                await _userManager.UpdateAsync(userEntity);
                responseDTO.Object = userEntity;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> RemoveUser(int id)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var userEntity = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == id) ?? throw new Exception("Usuário não encontrado!");
                await _userManager.DeleteAsync(userEntity);
                responseDTO.Object = userEntity;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> AddUserInRole(User user, RoleName role)
        {
            ResponseDTO responseDTO = new();
            try
            {
                if (!await _userManager.IsInRoleAsync(user, role.ToString()))
                    await _userManager.AddToRoleAsync(user, role.ToString());
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> RemoveUserInRole(User user, RoleName role)
        {
            ResponseDTO responseDTO = new();
            try
            {
                if (await _userManager.IsInRoleAsync(user, role.ToString()))
                    await _userManager.RemoveFromRoleAsync(user, role.ToString());
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }
    }
}