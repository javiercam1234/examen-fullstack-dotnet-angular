using ExamenBackend.Application.Interfaces;
using ExamenBackend.Domain.Entities;
using ExamenBackend.Infrastructure;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ExamenBackend.Infrastructure.Services
{
    public class PersonaService : IPersonaService
    {
        private readonly AppDbContext _context;

        public PersonaService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Persona>> GetAllPersonasAsync()
        {
            return await _context.Personas.Include(p => p.Puesto).ToListAsync();
        }

        public async Task<Persona?> GetPersonaByIdAsync(int id)
        {
            return await _context.Personas.Include(p => p.Puesto)
                                          .FirstOrDefaultAsync(p => p.IdPersona == id);
        }

        public async Task AddPersonaAsync(Persona persona)
        {
            await _context.Personas.AddAsync(persona);
            await _context.SaveChangesAsync();
        }

        public async Task UpdatePersonaAsync(Persona persona)
        {
            var local = await _context.Personas.FirstOrDefaultAsync(p => p.IdPersona == persona.IdPersona);

            if (local != null)
            {
                
                _context.Entry(local).State = EntityState.Detached;
            }

            
            persona.Puesto = null;

            _context.Personas.Update(persona);
            await _context.SaveChangesAsync();
        }

        public async Task DeletePersonaAsync(int id)
        {
            var persona = await _context.Personas.FindAsync(id);
            if (persona != null)
            {
                _context.Personas.Remove(persona);
                await _context.SaveChangesAsync();
            }
        }
    }
}
 