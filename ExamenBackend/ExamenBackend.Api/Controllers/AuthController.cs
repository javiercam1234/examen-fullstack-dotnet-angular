using ExamenBackend.Shared;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExamenBackend.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;

        public AuthController(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            // Aquí va tu lógica de validación (hardcoded por ahora)
            if (request.Username == "admin" && request.Password == "1234")
            {
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, request.Username)
                };
                if (string.IsNullOrEmpty(_jwtSettings.SecretKey))
                return StatusCode(500, "SecretKey no está configurado correctamente.");


                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.SecretKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: _jwtSettings.Issuer,
                    audience: _jwtSettings.Audience,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(_jwtSettings.ExpiryInMinutes),
                    signingCredentials: creds
                );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token)
                });
            }

            return Unauthorized();
        }
    }

    public class LoginRequest
    {
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}