namespace ExamenBackend.Domain.Entities
{
    public class Persona
    {
        public int IdPersona { get; set; }
        public string? Nombre { get; set; }
        public int? Edad { get; set; }
        public decimal? Telefono { get; set; }
        public DateTime? FechaNacimiento { get; set; }
        public string? Sexo { get; set; }
        public bool? Activo { get; set; }

        public int? IdPuesto { get; set; }
        public Puesto? Puesto { get; set; }
    }
}