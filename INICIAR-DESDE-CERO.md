# Cómo crear una app Angular desde cero

Esta guía explica cómo se crea un proyecto como este dashboard partiendo de una carpeta vacía.

> **Para el taller no necesitas hacer esto.** Solo clona el repositorio y sigue la sección [Levantar este proyecto](#levantar-este-proyecto). Esta guía es de consulta, para que sepas cómo se creó la base y puedas repetirlo en tus propios proyectos.

## 1. Requisitos

Verifica que tienes Node.js y npm instalados:

```bash
node -v
npm -v
```

Este proyecto usa **Angular 21**, que requiere Node.js `20.19+`, `22.12+` o `24`. Si tu versión es anterior, actualiza Node antes de continuar.

## 2. Instalar el CLI de Angular

El CLI (Command Line Interface) es la herramienta que crea y gestiona proyectos Angular. Se instala una sola vez por computadora:

```bash
npm install -g @angular/cli
```

Si no tienes permisos para instalar globalmente, puedes usar `npx` y saltarte este paso, usando `npx @angular/cli` en lugar de `ng`.

## 3. Crear el proyecto

```bash
ng new mi-app
cd mi-app
```

Durante la creación, el asistente hace algunas preguntas. Las opciones exactas pueden cambiar según la versión del CLI. Para este proyecto se usó:

| Pregunta | Opción |
|---|---|
| Formato de estilos | CSS |
| SSR / prerenderizado | Activado (el proyecto lo incluye, pero no es necesario para aprender) |

Si es tu primer proyecto, puedes desactivar SSR para que todo sea más simple.

## 4. Levantar el servidor de desarrollo

```bash
ng serve
```

Abre `http://localhost:4200` en el navegador. La app se recarga automáticamente cada vez que guardas un archivo.

## 5. Agregar Tailwind CSS (opcional)

Este dashboard usa [Tailwind CSS](https://tailwindcss.com) para los estilos. Es una librería de clases utilitarias. No viene incluida por defecto con `ng new`; en este proyecto está configurada así:

1. Instalar las dependencias de desarrollo:

   ```bash
   npm install -D tailwindcss @tailwindcss/postcss postcss
   ```

2. Crear el archivo `.postcssrc.json` en la raíz del proyecto:

   ```json
   {
     "plugins": {
       "@tailwindcss/postcss": {}
     }
   }
   ```

3. Importar Tailwind en `src/styles.css`:

   ```css
   @import 'tailwindcss';
   ```

Después de esto ya puedes usar clases como `bg-indigo-600`, `rounded-lg` o `p-4` directamente en los archivos HTML.

Si algo cambia en versiones futuras, consulta la guía oficial de Tailwind para Angular.

## 6. Comandos más usados

| Comando | Para qué sirve |
|---|---|
| `ng serve` | Levanta la app en modo desarrollo |
| `ng build` | Compila la app para producción |
| `ng test` | Ejecuta las pruebas unitarias |
| `ng generate component nombre` | Crea un componente (HTML, CSS y TypeScript) |
| `ng generate service nombre` | Crea un servicio |
| `ng generate pipe nombre` | Crea un pipe |
| `ng generate interface nombre` | Crea una interfaz |

Los comandos de `generate` tienen atajo: `ng g c`, `ng g s`, `ng g p`.

Puedes indicar una carpeta dentro del nombre y el CLI la crea si no existe:

```bash
ng g component features/cursos/lista-cursos
```

## Levantar este proyecto

Si solo quieres correr el dashboard del taller, no necesitas nada de lo anterior:

```bash
git clone https://github.com/ErierCode/dashboard-administrativo
cd dashboard-administrativo
npm install
npm start
```

Luego abre `http://localhost:4200`.

Si el puerto 4200 está ocupado, usa otro:

```bash
npm start -- --port 4300
```

## Estructura del proyecto

```
src/app/
├── app.ts / app.html       → componente raíz (solo contiene el router-outlet)
├── app.routes.ts           → qué URL muestra qué componente
├── app.config.ts           → configuración global de la app
├── core/
│   ├── models/             → interfaces que describen los datos
│   ├── services/           → datos y lógica compartida (con signals)
│   ├── pipes/              → transformaciones de valores en la plantilla
│   └── utils/              → funciones de apoyo (guardado en localStorage)
├── layout/shell/           → menú lateral y cabecera
└── features/               → cada sección de la aplicación
    ├── inicio/
    ├── estudiantes/
    └── cursos/
```

## Dónde seguir aprendiendo

- Documentación oficial: <https://angular.dev>
- Tutorial interactivo: <https://angular.dev/tutorials>
- Referencia del CLI: <https://angular.dev/tools/cli>
