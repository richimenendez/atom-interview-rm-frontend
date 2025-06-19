# Frontend AtomChat - README

## ¿Qué es esto?

Este es el backend de la aplicación que desarrollé para la entrevista con Atom, una aplicación web para gestionar tareas. Está construido con Angular 20, TypeScript y Angular Material, siguiendo principios de arquitectura modular y programación reactiva. En este proyecto traté de implementar la mayoría de conceptos que he manejado como desarrollador, me apoyé con IA para agilizar el desarrollo, pero todo sobre conceptos que he manejado en proyectos de la vida real. 
## ¿Por qué elegimos Angular?

### Angular 20 + TypeScript

Decidimos usar Angular porque es un framework maduro y robusto para aplicaciones empresariales. Angular nos da:

- **TypeScript nativo**: Tipado estático que previene errores
- **Arquitectura modular**: Código organizado y escalable
- **Herramientas potentes**: Angular CLI y DevTools
- **Ecosistema rico**: Angular Material, RxJS, etc.

TypeScript es especialmente útil porque nos ayuda a detectar errores desde el momento que escribimos el código, y los tipos sirven como documentación automática.

### Angular Material

Elegimos Angular Material porque queríamos una interfaz de usuario consistente y profesional. Material Design nos da:

- **Componentes listos para usar**: Botones, formularios, modales, etc.
- **Diseño responsive**: Se adapta a cualquier pantalla
- **Accesibilidad**: Navegación por teclado y lectores de pantalla
- **Temas personalizables**: Podemos cambiar colores fácilmente

## Arquitectura del proyecto

### Estructura modular

Organizamos el código en módulos para que sea fácil de mantener:

```
src/app/
├── auth/              # Todo lo relacionado con autenticación
├── tasks/             # Gestión de tareas
├── shared/            # Componentes y servicios compartidos
└── app.config.ts      # Configuración principal
```

Cada módulo tiene sus propios componentes, servicios y modelos. Esto hace que el código sea más organizado y fácil de entender.

### Lazy Loading

Usamos lazy loading para cargar los módulos solo cuando se necesitan. Esto significa que:

- La aplicación carga más rápido inicialmente
- Solo descargamos el código que realmente usamos
- Mejor experiencia de usuario

## ¿Cómo funciona la autenticación?

### JWT + Interceptors

La autenticación funciona así:

1. **Login/Register**: El usuario se autentica
2. **Token Storage**: Guardamos el JWT en localStorage
3. **Auto-injection**: Un interceptor agrega automáticamente el token a todas las requests
4. **Route Protection**: Un guard protege las rutas que requieren autenticación

### Estado de autenticación

Usamos RxJS BehaviorSubject para manejar el estado de autenticación de forma reactiva:

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

Esto nos da varias ventajas:
- Código reutilizable
- Fácil de testear
- Separación clara de responsabilidades

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

Tenemos dos tipos de componentes:

**Smart Components** (como TaskList):
- Contienen lógica de negocio
- Se comunican con servicios
- Manejan estado

**Dumb Components** (como Task):
- Solo muestran datos
- Emiten eventos
- Son reutilizables

### Sistema de modales

Creamos un sistema de modales reutilizable:

- **Modal genérico**: Se puede usar para cualquier contenido
- **Configuración dinámica**: Títulos, mensajes y botones configurables
- **Manejo de acciones**: Callbacks para botones
- **Accesibilidad**: Navegación por teclado y focus management

## Manejo de errores

### Estrategia comprehensiva

Tenemos un sistema robusto de manejo de errores:

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

Usamos Jasmine y Karma para testing:

- **Unit tests**: Para servicios y componentes
- **Integration tests**: Para interacción entre componentes
- **Mock services**: Para simular dependencias externas

### Cobertura de código

Tenemos tests para:
- Servicios de autenticación
- Servicios de tareas
- Componentes principales
- Manejo de errores

## Performance y optimización

### Optimizaciones de Angular

- **OnPush Change Detection**: Para componentes que no cambian frecuentemente
- **TrackBy functions**: Para optimizar ngFor
- **Lazy Loading**: Carga bajo demanda
- **Tree Shaking**: Elimina código no usado

### Bundle optimization

Configuramos límites de tamaño para el bundle:
- **Warning**: 500kB
- **Error**: 1MB

Esto nos ayuda a mantener la aplicación rápida.

## ¿Por qué esta arquitectura?

### Ventajas de nuestra decisión

**Modularidad**: Cada funcionalidad está en su propio módulo
**Reutilización**: Componentes y servicios se pueden reutilizar
**Mantenibilidad**: Código organizado y fácil de entender
**Escalabilidad**: Fácil agregar nuevas features
**Testing**: Cada parte se puede testear de forma aislada

### Comparación con otras opciones

**Angular vs React/Vue**:
- Angular es más opinado y estructurado
- Mejor para aplicaciones empresariales grandes
- TypeScript nativo
- Herramientas más potentes

**Angular Material vs otras UI libraries**:
- Integración perfecta con Angular
- Diseño consistente
- Accesibilidad incluida
- Menos configuración necesaria

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

## ¿Qué sigue?

Algunas mejoras que podríamos implementar:

- **NgRx/Redux**: Para estado global más complejo
- **PWA**: Para funcionalidad offline
- **Server-Side Rendering**: Con Angular Universal
- **Micro Frontends**: Para escalabilidad
- **E2E Testing**: Con Cypress o Playwright
- **Storybook**: Para documentación de componentes
- **Web Workers**: Para operaciones pesadas

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

