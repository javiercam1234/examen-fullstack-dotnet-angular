using Microsoft.AspNetCore.Mvc;
using ExamenBackend.Application.Interfaces;
using ExamenBackend.Domain.Entities;
using System;
using System.Threading.Tasks;

namespace ExamenBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PuestoController : ControllerBase
    {
        private readonly IPuestoService _puestoService;

        public PuestoController(IPuestoService puestoService)
        {
            _puestoService = puestoService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            try
            {
                var puestos = await _puestoService.GetAllAsync();
                return Ok(puestos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetById(int id)
        {
            try
            {
                var puesto = await _puestoService.GetByIdAsync(id);
                if (puesto == null)
                    return NotFound();

                return Ok(puesto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] Puesto puesto)
        {
            try
            {
                await _puestoService.AddAsync(puesto);
                return CreatedAtAction(nameof(GetById), new { id = puesto.IdPuesto }, puesto);
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al guardar: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> Update(int id, [FromBody] Puesto puesto)
        {
            if (id != puesto.IdPuesto)
                return BadRequest("El ID no coincide.");

            try
            {
                var existing = await _puestoService.GetByIdAsync(id);
                if (existing == null)
                    return NotFound();

                await _puestoService.UpdateAsync(puesto);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al actualizar: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var existing = await _puestoService.GetByIdAsync(id);
                if (existing == null)
                    return NotFound();

                await _puestoService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest($"Error al eliminar: {ex.Message}");
            }
        }
    }
}
