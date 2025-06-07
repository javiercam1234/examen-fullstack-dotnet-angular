using ExamenBackend.Domain.Entities;
using System.Collections.Generic;

namespace ExamenBackend.Application.Interfaces
{
    public interface IPuestoService
    {
        Task<IEnumerable<Puesto>> GetAllAsync();
        Task<Puesto?> GetByIdAsync(int id);
        Task AddAsync(Puesto puesto);
        Task UpdateAsync(Puesto puesto);
        Task DeleteAsync(int id);
    }
}
