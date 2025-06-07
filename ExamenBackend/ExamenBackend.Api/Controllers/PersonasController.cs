using ExamenBackend.Application.Interfaces;
using ExamenBackend.Domain.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace ExamenBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PersonasController : ControllerBase
    {
        private readonly IPersonaService _personaService;

        public PersonasController(IPersonaService personaService)
        {
            _personaService = personaService;
        }

        // GET: api/Personas
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            try
            {
                var personas = await _personaService.GetAllPersonasAsync();
                return Ok(personas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // GET: api/Personas/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            try
            {
                var persona = await _personaService.GetPersonaByIdAsync(id);
                if (persona == null)
                    return NotFound();

                return Ok(persona);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        // POST: api/Personas
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Persona persona)
        {
            try
            {
                // No intentes insertar el objeto Puesto, solo su IdPuesto
                persona.Puesto = null;

                // Asegurarse que IdPersona sea 0 para evitar conflicto con Identity
                persona.IdPersona = 0;

                await _personaService.AddPersonaAsync(persona);
                return CreatedAtAction(nameof(Get), new { id = persona.IdPersona }, persona);
            }
            catch (DbUpdateException dbEx)
            {
                var innerMessage = dbEx.InnerException?.Message ?? dbEx.Message;
                return BadRequest($"Error al guardar (detalle): {innerMessage}");
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al guardar: {ex.Message}");
            }
        }

        // PUT: api/Personas/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Persona persona)
        {
            if (id != persona.IdPersona)
                return BadRequest("El ID del parámetro no coincide con el ID de la entidad.");

            try
            {
                var existing = await _personaService.GetPersonaByIdAsync(id);
                if (existing == null)
                    return NotFound();

                // Evitar que EF intente insertar Puesto como nueva entidad
                persona.Puesto = null;

                await _personaService.UpdatePersonaAsync(persona);
                return NoContent();
            }
            catch (DbUpdateException dbEx)
            {
                var innerMessage = dbEx.InnerException?.Message ?? dbEx.Message;
                return BadRequest($"Error al actualizar (detalle): {innerMessage}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar: {ex.Message}");
            }
        }

        // DELETE: api/Personas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var existing = await _personaService.GetPersonaByIdAsync(id);
                if (existing == null)
                    return NotFound();

                await _personaService.DeletePersonaAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar: {ex.Message}");
            }
        }
    }
}
