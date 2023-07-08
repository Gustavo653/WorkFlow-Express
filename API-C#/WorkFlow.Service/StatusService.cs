using Common.DTO;
using Microsoft.EntityFrameworkCore;
using WorkFlow.Application.Interface;
using WorkFlow.Domain;
using WorkFlow.DTO;
using WorkFlow.Service.Interface;

namespace WorkFlow.Service
{
    public class StatusService : IStatusService
    {
        private readonly IStatusRepository _statusRepository;

        public StatusService(IStatusRepository statusRepository)
        {
            _statusRepository = statusRepository;
        }

        public async Task<ResponseDTO> CreateStatus(BasicDTO basicDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var StatusExists = await _statusRepository.GetEntities().AnyAsync(c => c.Name == basicDTO.Name);
                if (StatusExists)
                {
                    responseDTO.SetBadInput($"O status {basicDTO.Name} já existe!");
                    return responseDTO;
                }
                var Status = new Status
                {
                    Name = basicDTO.Name,
                    CreatedAt = DateTime.Now,
                };
                await _statusRepository.InsertAsync(Status);
                await _statusRepository.SaveChangesAsync();
                responseDTO.Object = Status;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> UpdateStatus(int id, BasicDTO basicDTO)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var Status = await _statusRepository.GetTrackedEntities().FirstOrDefaultAsync(c => c.Id == id);
                if (Status == null)
                {
                    responseDTO.SetBadInput($"O status {basicDTO.Name} não existe!");
                    return responseDTO;
                }
                Status.Name = basicDTO.Name;
                Status.UpdatedAt = DateTime.Now;
                await _statusRepository.SaveChangesAsync();
                responseDTO.Object = Status;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> RemoveStatus(int id)
        {
            ResponseDTO responseDTO = new();
            try
            {
                var Status = await _statusRepository.GetTrackedEntities().FirstOrDefaultAsync(c => c.Id == id);
                if (Status == null)
                {
                    responseDTO.SetBadInput($"O status com id: {id} não existe!");
                    return responseDTO;
                }
                _statusRepository.Delete(Status);
                await _statusRepository.SaveChangesAsync();
                responseDTO.Object = Status;
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }

        public async Task<ResponseDTO> GetStatuses()
        {
            ResponseDTO responseDTO = new();
            try
            {
                responseDTO.Object = await _statusRepository.GetEntities().ToListAsync();
            }
            catch (Exception ex)
            {
                responseDTO.SetError(ex);
            }
            return responseDTO;
        }
    }
}