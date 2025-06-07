# 🧪 Examen Full Stack - Angular + .NET

Aplicación full stack desarrollada como parte de una prueba técnica. Consiste en un sistema de gestión de personas y sus respectivos puestos, con autenticación basada en JWT y operaciones CRUD completas.

---

## 🚀 Tecnologías Utilizadas

### 📦 Backend - ASP.NET Core 7

- **ASP.NET Core Web API**
- **Entity Framework Core** (Code First, SQL Server)
- **Autenticación JWT**:
  - Generación de tokens en `/api/auth/login`
  - Validación simple basada en el nombre del usuario (el password es igual al nombre)
  - Tokens con `Claims` personalizados (`ClaimTypes.Name`)
  - Middleware con `[Authorize]` para proteger endpoints
- **Arquitectura en capas**:
  - `Domain`: Entidades y modelos
  - `Application`: Interfaces y lógica de negocio
  - `Infrastructure`: Implementaciones, servicios, repositorios, EF
  - `API`: Controladores y capa de presentación
- **Validaciones y manejo de errores**:
  - `DataAnnotations` en modelos
  - Captura de errores con respuestas claras (400/500)
- **Control de entidades relacionadas**:
  - Evita duplicación con `DbContext.Entry().State`
  - Relaciones entre Persona y Puesto manejadas por `idPuesto`

---

### 🌐 Frontend - Angular 16+

- **Angular Standalone Components**
- **Angular Material**:
  - Formularios, botones, selects, diálogos, inputs
- **Formularios Reactivos**
  - Validación visual y funcional en tiempo real
- **Servicios HTTP + RxJS**
  - Comunicación con backend mediante `HttpClient`
- **Gestión de JWT**:
  - Token almacenado en `localStorage`
  - Header `Authorization: Bearer` incluido en cada request
- **Ruteo y navegación segura**
- **Componentes**:
  - Login
  - Lista de personas
  - Diálogo para crear/editar persona

---

## 🔐 Autenticación

### Login

- Endpoint: `POST /api/auth/login`
- Cuerpo:
  ```json
  {
    "username": "juan",
    "password": "juan"
  }
Si el nombre coincide con la contraseña, se emite un token JWT.

Uso del Token
El token se almacena en el navegador (localStorage)

Se agrega automáticamente a las solicitudes:

makefile
Copiar
Editar
Authorization: Bearer <token>
Solo usuarios autenticados pueden acceder a los endpoints protegidos ([Authorize])

🛠️ Funcionalidades
✅ Login basado en nombre (username = password)

✅ Listar personas desde API protegida

✅ Crear nueva persona con validación

✅ Editar persona con prellenado del formulario

✅ Eliminar persona con confirmación

✅ Selección dinámica de puestos

✅ Protección de rutas en frontend

✅ Gestión de tokens y headers

✅ UI moderna y responsiva con Angular Material

▶️ ¿Cómo Ejecutarlo?
Backend (.NET Core)
Restaurar dependencias:

nginx
Copiar
Editar
dotnet restore
Aplicar migraciones (si usa EF Code First):

pgsql
Copiar
Editar
dotnet ef database update
Ejecutar API:

arduino
Copiar
Editar
dotnet run
Acceso: http://localhost:5285

Frontend (Angular)
Instalar dependencias:

nginx
Copiar
Editar
npm install
Ejecutar servidor de desarrollo:

nginx
Copiar
Editar
ng serve
Abrir en navegador: http://localhost:4200

🧑‍💻 Autor
Desarrollado por Javier
Proyecto técnico full stack Angular + ASP.NET Core

yaml
Copiar
Editar
