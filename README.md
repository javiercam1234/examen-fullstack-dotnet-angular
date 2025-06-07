📚 Examen Full Stack - Angular + .NET
Este proyecto es una aplicación full stack desarrollada como parte de una evaluación técnica. Permite gestionar un listado de personas y sus respectivos puestos de trabajo.

Incluye funcionalidades completas de autenticación con JWT, operaciones CRUD, y consumo de servicios RESTful con integración de Angular Material para una interfaz moderna.

🧰 Tecnologías Utilizadas
📦 Backend (.NET 7)
ASP.NET Core Web API

Entity Framework Core con base de datos relacional (SQL Server)

Autenticación JWT (Json Web Tokens)

Arquitectura Clean Architecture con capas:

Domain

Application

Infrastructure

Api

Inyección de dependencias

Validación de modelos y manejo de errores personalizados

🌐 Frontend (Angular 16+)
Angular standalone components

Angular Material (UI: formularios, diálogos, inputs, botones)

RxJS para manejo de peticiones y estado

Routing con protección de rutas

Manejo de tokens con localStorage

Servicios HTTP para consumir API RESTful

Autenticación básica con formulario de login

✨ Funcionalidades
Login con validación de usuario y JWT

Listado de personas con paginación y filtrado

Crear, editar y eliminar personas

Selección de puesto desde combo dinámico

Validaciones en frontend y backend

Modal de formulario reutilizable

🚀 Cómo ejecutar
Clona el proyecto

Configura la cadena de conexión en el backend (appsettings.json)

Ejecuta migraciones si es necesario (dotnet ef database update)

Inicia el backend con dotnet run

Entra al frontend con:

bash
Copiar
Editar
cd frontend
npm install
ng serve
Navega a http://localhost:4200
