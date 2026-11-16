# Frontend — Mi Lista de Tareas

Cliente web interactivo, accesible y con diseño responsivo para la gestión de tareas personales. Construido con HTML5 semántico, CSS moderno y JavaScript Vanilla.

## Características
- **Interfaz moderna y limpia**: Paleta de colores armónica con diseño centrado en la experiencia de usuario (UX).
- **Tarjetas de resumen dinámicas**: Contador en tiempo real de tareas totales, pendientes y completadas.
- **Operaciones completas (CRUD)**: Creación, lectura, marcado como completado y eliminación de tareas individuales.
- **Acción masiva**: Botón para depurar y limpiar todas las tareas completadas en un solo paso.
- **Diseño responsivo**: Adaptable a dispositivos móviles y pantallas de escritorio.
- **Integración con API REST**: Comunicación asíncrona mediante `fetch` al backend bajo la ruta `/api/tasks`.

## Estructura del proyecto
- `index.html`: Estructura semántica de la aplicación.
- `styles.css`: Estilos visuales, variables CSS y diseño adaptable.
- `app.js`: Lógica de negocio, renderizado dinámico del DOM y peticiones HTTP.
- `nginx.conf`: Configuración del servidor web y proxy reverso hacia el backend.
- `Dockerfile`: Empaquetado de la aplicación en contenedor Nginx ligero.

## Ejecución local

### Opción 1: Servidor estático local
Puedes abrir el proyecto con Live Server en VS Code o con cualquier servidor HTTP local:
```bash
npx serve .
```
> Nota: Para interactuar con los datos, el backend debe estar ejecutándose y accesible en la ruta `/api/`.

### Opción 2: Docker
Construir la imagen de Docker:
```bash
docker build -t lista-tareas-frontend .
```

Ejecutar el contenedor:
```bash
docker run -d -p 8080:80 --name lista-frontend lista-tareas-frontend
```

Acceder desde el navegador en `http://localhost:8080`.
