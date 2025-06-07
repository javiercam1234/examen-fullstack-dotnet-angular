using ExamenBackend.Domain.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExamenBackend.Application.Interfaces
{
    public interface IPersonaService
    {
        Task<IEnumerable<Persona>> GetAllPersonasAsync();
        Task<Persona?> GetPersonaByIdAsync(int id);
        Task AddPersonaAsync(Persona persona);
        Task UpdatePersonaAsync(Persona persona);
        Task DeletePersonaAsync(int id);
    }
}