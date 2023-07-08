using Common.DTO;
using Microsoft.EntityFrameworkCore;
using WorkFlow.Application.Interface;
using WorkFlow.Domain;
using WorkFlow.DTO;
using WorkFlow.Service.Interface;

namespace WorkFlow.Service
{
    public class PriorityService : IPriorityService
    {
        private readonly IPriorityRepository _priorityRepository;

        public PriorityService(IPriorityRepository priorityRepository)
        {
            _priorityRepository = priorityRepository;
        }

        public async Task<ResponseDTO> CreatePriority(BasicDTO basicDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var priorityExists = await _priorityRepository.GetEntities().AnyAsync(c => c.Name == basicDTO.Name);
                if (priorityExists)
                {
                    responseDTO.SetBadInput($"A prioridade {basicDTO.Name} já existe!");
                    return responseDTO;
                }
                var priority = new Priority
                {
                    Name = basicDTO.Name,
                    CreatedAt = DateTime.Now,
                };
                await _priorityRepository.InsertAsync(priority);
                await _priorityRepository.SaveChangesAsync();
                responseDTO.Object = priority;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> UpdatePriority(int id, BasicDTO basicDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var priority = await _priorityRepository.GetTrackedEntities().FirstOrDefaultAsync(c => c.Id == id);
                if (priority == null)
                {
                    responseDTO.SetBadInput($"A prioridade {basicDTO.Name} não existe!");
                    return responseDTO;
                }
                priority.Name = basicDTO.Name;
                priority.UpdatedAt = DateTime.Now;
                await _priorityRepository.SaveChangesAsync();
                responseDTO.Object = priority;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> RemovePriority(int id)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var priority = await _priorityRepository.GetTrackedEntities().FirstOrDefaultAsync(c => c.Id == id);
                if (priority == null)
                {
                    responseDTO.SetBadInput($"A prioridade com id: {id} não existe!");
                    return responseDTO;
                }
                _priorityRepository.Delete(priority);
                await _priorityRepository.SaveChangesAsync();
                responseDTO.Object = priority;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> GetPriorities()
        {
            ResponseDTO responseDTO = new();
            try
            {
                responseDTO.Object = await _priorityRepository.GetEntities().ToListAsync();
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }
    }
}