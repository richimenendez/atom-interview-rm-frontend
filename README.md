# Frontend AtomChat - README

## ¿Qué es esto?

Este es el backend de la aplicación que desarrollé para la entrevista con Atom, una aplicación web para gestionar tareas. Está construido con Angular 20, TypeScript y Angular Material, siguiendo principios de arquitectura modular y programación reactiva. En este proyecto traté de implementar la mayoría de conceptos que he manejado como desarrollador, me apoyé con IA para agilizar el desarrollo, pero todo sobre conceptos que he manejado en proyectos de la vida real. 

### Angular Material

Trate de usar Angular Material al ser la librería mas usada con Angular, en lo personal, prefiero hacer mis propios diseños, y talvez usar los elementos solo para funcionalidades, pero generalmente prefiero usar Tailwind. Aunque hago el ejercicio para demostrar el uso en la herramienta. La cual usaría sin problema. Trate de mezclar tanto SCSS, como Componentes de Angular Material.

## Arquitectura del proyecto

### Estructura modular

Organizé el código en módulos para que sea fácil de mantener:

```
src/app/
├── auth/              # Todo lo relacionado con autenticación
├── tasks/             # Gestión de tareas
├── shared/            # Componentes y servicios compartidos
└── app.config.ts      # Configuración principal
```

Cada módulo tiene sus propios componentes, servicios y modelos. Esto hace que el código sea más organizado y fácil de entender.

### Lazy Loading

Se usó lazy loading para cargar los módulos solo cuando se necesitan. Esto significa que:

- La aplicación carga más rápido inicialmente
- Solo se descarga el código que realmente se usa
- Mejor experiencia de usuario

## ¿Cómo funciona la autenticación?

### JWT + Interceptors

La autenticación funciona así:

1. **Login/Register**: El usuario se autentica
2. **Token Storage**: Guardamos el JWT en localStorage
3. **Auto-injection**: Un interceptor agrega automáticamente el token a todas las requests
4. **Route Protection**: Un guard protege las rutas que requieren autenticación

### Estado de autenticación

Usé RxJS BehaviorSubject para manejar el estado de autenticación de forma reactiva:

```typescript
// Cuando el usuario hace login
this.authStateService.updateAuthState(token, email);

// Los componentes se actualizan automáticamente
this.authState$.subscribe(state => {
  // UI se actualiza cuando cambia el estado
});
```

## Gestión de estado y datos

### Service Layer Pattern

Toda la lógica de negocio está en servicios:

- **AuthService**: Maneja autenticación
- **TaskService**: Maneja operaciones con tareas
- **ErrorHandlerService**: Maneja errores de forma centralizada

Esto da varias ventajas:
- Código reutilizable
- Fácil de testear
- Separación clara de responsabilidades

Aunque es el estandar de Angular, es la ventaja de usar un framework, ya ofrece en su catalogo de opciones, buenas practicas para resolver problemas comunes.
### Programación Reactiva con RxJS

Usamos RxJS para manejar streams de datos:

```typescript
// Obtener tareas con filtros
this.taskService.getTasks(filters).subscribe({
  next: (tasks) => this.tasks = tasks,
  error: (err) => this.handleError(err)
});
```

RxJS nos permite:
- Manejar operaciones asíncronas de forma elegante
- Transformar datos con operadores
- Manejar errores en los streams
- Cancelar operaciones cuando sea necesario

## Componentes y UI

### Arquitectura de componentes

Hay dos tipos de componentes:

**Smart Components** (como TaskList):
- Contienen lógica de negocio
- Se comunican con servicios
- Manejan estado

**Dumb Components** (como Task):
- Solo muestran datos
- Emiten eventos
- Son reutilizables

### Sistema de modales

Cree un sistema de modales reutilizable:

- **Modal genérico**: Se puede usar para cualquier contenido
- **Configuración dinámica**: Títulos, mensajes y botones configurables
- **Manejo de acciones**: Callbacks para botones
- **Accesibilidad**: Navegación por teclado y focus management

## Manejo de errores

### Estrategia comprehensiva

Hicé un sistema robusto de manejo de errores:

**ErrorHandlerService**: Servicio centralizado que:
- Detecta el tipo de error automáticamente
- Muestra errores de validación en modales
- Muestra errores generales en snackbars
- Formatea mensajes de error para el usuario

**Tipos de errores que manejamos**:
- Errores de validación del backend
- Errores de red/conexión
- Errores de autenticación
- Errores generales de la aplicación

### Experiencia de usuario

- **Snackbars**: Para mensajes temporales
- **Modales**: Para errores importantes
- **Loading states**: Indicadores de carga
- **Optimistic updates**: Actualizaciones inmediatas en la UI

## Testing

### Estrategia de testing

Se usó Jasmine y Karma para testing:

- **Unit tests**: Para servicios y componentes
- **Integration tests**: Para interacción entre componentes
- **Mock services**: Para simular dependencias externas

## Performance y optimización

### Optimizaciones de Angular

- **OnPush Change Detection**: Para componentes que no cambian frecuentemente
- **TrackBy functions**: Para optimizar ngFor
- **Lazy Loading**: Carga bajo demanda
- **Tree Shaking**: Elimina código no usado

## ¿Por qué esta arquitectura?

### Ventajas de esta implementación

**Modularidad**: Cada funcionalidad está en su propio módulo
**Reutilización**: Componentes y servicios se pueden reutilizar
**Mantenibilidad**: Código organizado y fácil de entender
**Escalabilidad**: Fácil agregar nuevas features
**Testing**: Cada parte se puede testear de forma aislada

## Scripts disponibles

```bash
npm start              # Ejecutar en modo desarrollo
npm run build          # Build de producción
npm test               # Ejecutar tests
npm run test:coverage  # Tests con cobertura
```

## Variables de entorno

Necesitas configurar:
- `firebaseConfig`: Configuración de Firebase
- `apiUrl`: URL del backend

## Características de UX/UI

### Diseño responsive

- **Mobile First**: Optimizado para móviles
- **Breakpoints**: Se adapta a diferentes pantallas
- **Touch Friendly**: Interacciones táctiles
- **Accesibilidad**: Navegación por teclado

### Experiencia de usuario

- **Loading States**: Indicadores de carga
- **Optimistic Updates**: Cambios inmediatos en la UI
- **Error Recovery**: Recuperación de errores
- **Form Validation**: Validación en tiempo real

### Diseño visual

- **Material Design**: Principios de Material Design
- **Color Scheme**: Paleta de colores consistente
- **Typography**: Tipografía legible
- **Spacing**: Espaciado consistente

