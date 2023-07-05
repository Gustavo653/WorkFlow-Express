using AutoMapper;
using Common.DTO;
using WorkFlow.Domain;
using WorkFlow.Domain.Identity;

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