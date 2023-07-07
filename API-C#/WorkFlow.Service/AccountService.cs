using AutoMapper;
using Common.DTO;
using Common.Functions;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WorkFlow.Application.Interface;
using WorkFlow.Domain.Enum;
using WorkFlow.Domain.Identity;
using WorkFlow.DTO;
using WorkFlow.Service.Interface;

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
                                            .Include(x => x.UserRoles).ThenInclude(x => x.Role)
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

        public async Task<ResponseDTO> GetCurrent(string email)
        {
            ResponseDTO responseDTO = new();
            try
            {
                responseDTO.Object = await GetUserByEmail(email);
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
                if (user != null)
                {
                    responseDTO.SetBadInput($"Já existe um usuário cadastrado com este e-mail: {userDTO.Email}!");
                    return responseDTO;
                }
                var userEntity = new User();
                PropertyCopier<UserDTO, User>.Copy(userDTO, userEntity);
                await _userManager.CreateAsync(userEntity, userDTO.Password);
                foreach (var item in userDTO.Roles)
                    await AddUserInRole(userEntity, item);
                responseDTO.Object = userEntity;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> UpdateUser(int id, UserDTO userDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var userEntity = await _userManager.FindByIdAsync(id.ToString());
                if (userEntity == null)
                {
                    responseDTO.SetBadInput($"Usuário não encotrado com este id: {id}!");
                    return responseDTO;
                }
                PropertyCopier<UserDTO, User>.Copy(userDTO, userEntity);
                await _userManager.UpdateAsync(userEntity);
                var userRoles = await _userManager.GetRolesAsync(userEntity);
                await _userManager.RemoveFromRolesAsync(userEntity, userRoles);
                foreach (var item in userDTO.Roles)
                    await AddUserInRole(userEntity, item);
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
                var userEntity = await _userManager.FindByIdAsync(id.ToString());
                if (userEntity == null)
                {
                    responseDTO.SetBadInput($"Usuário não encontrado com este id: {id}!");
                    return responseDTO;
                }
                var userRoles = await _userManager.GetRolesAsync(userEntity);
                await _userManager.RemoveFromRolesAsync(userEntity, userRoles);
                await _userManager.DeleteAsync(userEntity);
                responseDTO.Object = userEntity;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        private async Task AddUserInRole(User user, RoleName role)
        {
            if (!await _userManager.IsInRoleAsync(user, role.ToString()))
                await _userManager.AddToRoleAsync(user, role.ToString());
        }
    }
}