using ExamenBackend.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExamenBackend.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Persona> Personas { get; set; }
        public DbSet<Puesto> Puestos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

             modelBuilder.Entity<Persona>(entity =>
            {
                entity.ToTable("tblPersona");
                entity.HasKey(p => p.IdPersona);

                entity.Property(p => p.Nombre).HasMaxLength(50);
                entity.Property(p => p.Telefono).HasColumnType("numeric(18, 0)");
                entity.Property(p => p.Sexo).HasColumnType("nchar(10)");

                entity.HasOne(p => p.Puesto)
                    .WithMany() // Aquí no ponemos la colección porque no la tienes
                    .HasForeignKey(p => p.IdPuesto);
            });

            modelBuilder.Entity<Puesto>(entity =>
            {
                entity.ToTable("tblPuestos");
                entity.HasKey(p => p.IdPuesto);
                entity.Property(p => p.DescripcionPuesto).HasMaxLength(50);
            });
                    }
            }
}