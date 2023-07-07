using AutoMapper;
using WorkFlow.Domain.Identity;
using WorkFlow.DTO;

namespace WorkFlow.Service
{
    public class WorkFlowProfile : Profile
    {
        public WorkFlowProfile()
        {
            CreateMap<User, UserDTO>(MemberList.None).ReverseMap();
            CreateMap<User, UserLoginDTO>(MemberList.None).ReverseMap();
        }
    }
}