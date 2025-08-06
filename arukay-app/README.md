# Arukay App - Gestión de Usuarios

Aplicación React con TypeScript para la gestión de usuarios, integrada con una API FastAPI y base de datos SQLite.

## Características

- ✅ Formulario de registro de usuarios con validación
- ✅ Integración con API REST (FastAPI)
- ✅ Base de datos SQLite
- ✅ Principios SOLID y Clean Code
- ✅ Manejo de errores robusto
- ✅ Interfaz de usuario moderna con Tailwind CSS
- ✅ TypeScript para type safety

## Arquitectura

### Principios SOLID aplicados:

1. **Single Responsibility Principle (SRP)**: Cada clase tiene una única responsabilidad

   - `ApiService`: Manejo de peticiones HTTP
   - `UserRepository`: Operaciones CRUD de usuarios
   - `UserService`: Lógica de negocio de usuarios

2. **Open/Closed Principle (OCP)**: Extensible sin modificar código existente

   - Interfaces `IUserRepository` e `IUserService` permiten diferentes implementaciones

3. **Liskov Substitution Principle (LSP)**: Implementaciones intercambiables

   - Cualquier implementación de `IUserRepository` puede ser usada

4. **Interface Segregation Principle (ISP)**: Interfaces específicas

   - `IUserRepository` solo define métodos de usuarios

5. **Dependency Inversion Principle (DIP)**: Dependencias de abstracciones
   - El hook depende de `IUserService`, no de implementaciones concretas

### Estructura de archivos:

```
src/
├── components/
│   └── UserForm.tsx          # Componente principal
├── hooks/
│   └── useUserForm.ts        # Hook personalizado
├── services/
│   ├── api.ts               # Servicio genérico HTTP
│   └── userService.ts       # Servicio específico de usuarios
├── types/
│   └── user.ts              # Tipos y esquemas de validación
└── config/
    └── environment.ts        # Configuración del entorno
```

## Instalación

1. Instalar dependencias:

```bash
npm install
```

2. Configurar variables de entorno (opcional):

```bash
# .env
VITE_API_BASE_URL=http://localhost:8000
```

3. Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## API Endpoints

La aplicación se conecta a una API FastAPI con los siguientes endpoints:

- `POST /users/` - Crear usuario
- `GET /users/` - Obtener todos los usuarios
- `DELETE /users/{id}` - Eliminar usuario

## Tecnologías utilizadas

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Validación**: Zod
- **HTTP Client**: Axios
- **Backend**: FastAPI, SQLAlchemy, SQLite

## Características técnicas

### Manejo de errores

- Errores de validación del formulario
- Errores de conexión con la API
- Mensajes de error contextuales

### Estados de carga

- Indicador de carga al obtener usuarios
- Estado de envío del formulario
- Feedback visual para todas las operaciones

### Validación

- Validación del lado del cliente con Zod
- Validación del lado del servidor
- Mensajes de error específicos por campo

## Desarrollo

### Agregar nuevos campos

1. Actualizar `userSchema` en `types/user.ts`
2. Actualizar el formulario en `UserForm.tsx`
3. Actualizar la transformación de datos en `userService.ts`

### Agregar nuevas operaciones

1. Definir método en `IUserRepository`
2. Implementar en `UserRepository`
3. Agregar al hook `useUserForm`

### Testing

```bash
npm run lint    # Verificar código
npm run build   # Construir para producción
```

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abrir un Pull Request
