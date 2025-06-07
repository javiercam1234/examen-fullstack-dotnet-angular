using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using ExamenBackend.Shared;
using ExamenBackend.Infrastructure;
using Microsoft.EntityFrameworkCore;
using ExamenBackend.Application.Interfaces;
using ExamenBackend.Infrastructure.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuración JWT
var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();
if (jwtSettings == null)
{
    throw new InvalidOperationException("JwtSettings configuration section is missing or invalid.");
}
builder.Services.Configure<JwtSettings>(builder.Configuration.GetSection("JwtSettings"));

// Configura servicios
builder.Services.AddOpenApi();

// builder.Services.AddDbContext<AppDbContext>(options =>
// options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")).EnableSensitiveDataLogging());    

builder.Services.AddScoped<IPersonaService, PersonaService>();
builder.Services.AddScoped<IPuestoService, PuestoService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "ExamenBackend.Api", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Introduce tu token JWT. Ejemplo: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

// ✅ CONFIGURAR CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("PermitirAngular",
        policy => policy.WithOrigins("http://localhost:4200")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// ✅ AUTENTICACIÓN
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
    };
});

var app = builder.Build();

// Solo para entorno de desarrollo
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.MapOpenApi();
}

// Redirecciona a HTTPS
app.UseHttpsRedirection();

// Middleware de manejo de errores personalizados
app.UseMiddleware<ExamenBackend.Api.Middleware.ExceptionHandlingMiddleware>();
app.UseMiddleware<ErrorHandlingMiddleware>();

 
app.UseCors("PermitirAngular");

// Autenticación y autorización
app.UseAuthentication();
app.UseAuthorization();

// Mapear controladores
app.MapControllers();

// Ejecutar la app
app.Run();
