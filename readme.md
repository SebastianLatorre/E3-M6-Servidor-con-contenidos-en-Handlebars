E3-M6 Ejercicio
Ejercicio: Servidor de Contenidos Estáticos y Dinámicos Avanzado con Handlebars 🎨
Objetivo: Aprender a configurar un servidor Express para servir archivos estáticos, generar páginas HTML dinámicas con Handlebars (HBS), y utilizar características avanzadas como condicionales, parciales y helpers para construir una vista compleja.

Parte 1: Servidor de Archivos Estáticos
En esta parte, harás que tu servidor entregue un archivo HTML y su hoja de estilos sin procesarlos.

Instrucciones:

Estructura del Proyecto:

Dentro de la carpeta de tu proyecto, crea una nueva carpeta llamada public.

Dentro de public, crea un archivo index.html con contenido básico y un style.css con estilos simples.

Configuración de Express:

En tu archivo app.js, añade la siguiente línea para que Express use la carpeta public para servir archivos estáticos:

app.use(express.static('public'));
Verificación:

Inicia tu servidor (npm start).

Visita http://localhost:3000. Deberías ver tu página index.html con los estilos aplicados. Express sirve el index.html de la carpeta public por defecto en la ruta raíz (/).

Parte 2: Renderizado de una Vista Dinámica Simple (Introducción)
Ahora, crearás una página simple cuyo contenido se genera en el servidor usando datos y una plantilla.

Instrucciones:

Instalación:

Si aún no lo has hecho, instala hbs:

npm install hbs
Estructura de Vistas:

En la raíz de tu proyecto, crea una carpeta llamada views.

Dentro de views, crea un archivo llamado perfil.hbs.

Creación de la Plantilla:

En perfil.hbs, usa la sintaxis de Handlebars {{variable}} para marcar dónde irán los datos:

<h1>Hola, mi nombre es {{nombre}}</h1>
<p>Soy {{profesion}}.</p>
Configuración del Motor de Plantillas:

En app.js, configura hbs como el motor de vistas de tu aplicación:

app.set('view engine', 'hbs');
Creación de la Ruta Dinámica:

Crea una nueva ruta en app.js para /perfil y usa res.render() para pasarle datos:

app.get('/perfil', (req, res) => {
res.render('perfil', {
nombre: 'Ana',
profesion: 'Desarrolladora Web'
});
});
Verificación:

Reinicia tu servidor y visita http://localhost:3000/perfil. Deberías ver la página renderizada con los datos de Ana.

## E3-M6 Ejercicio

### Ejercicio: Servidor de Contenidos Estáticos y Dinámicos Avanzado con Handlebars 🎨

**Objetivo:** Aprender a configurar un servidor Express para servir archivos estáticos, generar páginas HTML dinámicas con Handlebars (HBS), y utilizar características avanzadas como condicionales, parciales y helpers para construir una vista compleja.

## Parte 1: Servidor de Archivos Estáticos

En esta parte, harás que tu servidor entregue un archivo HTML y su hoja de estilos sin procesarlos.

### Instrucciones:

#### Estructura del Proyecto:

Dentro de la carpeta de tu proyecto, crea una nueva carpeta llamada `public`.

Dentro de `public`, crea un archivo `index.html` con contenido básico y un `style.css` con estilos simples.

#### Configuración de Express:

En tu archivo `app.js`, añade la siguiente línea para que Express use la carpeta public para servir archivos estáticos:

```js
app.use(express.static('public'));
```

#### Verificación:

Inicia tu servidor (`npm start`).

Visita http://localhost:3000. Deberías ver tu página `index.html` con los estilos aplicados. Express sirve el `index.html` de la carpeta `public` por defecto en la ruta raíz (`/`).

## Parte 2: Renderizado de una Vista Dinámica Simple (Introducción)

Ahora, crearás una página simple cuyo contenido se genera en el servidor usando datos y una plantilla.

### Instrucciones:

#### Instalación:

Si aún no lo has hecho, instala `hbs`:

```bash
npm install hbs
```

#### Estructura de Vistas:

En la raíz de tu proyecto, crea una carpeta llamada `views`.

Dentro de `views`, crea un archivo llamado `perfil.hbs`.

#### Creación de la Plantilla:

En `perfil.hbs`, usa la sintaxis de Handlebars `{{variable}}` para marcar dónde irán los datos:

```html
<h1>Hola, mi nombre es {{nombre}}</h1>
<p>Soy {{profesion}}.</p>
```

#### Configuración del Motor de Plantillas:

En `app.js`, configura `hbs` como el motor de vistas de tu aplicación:

```js
app.set('view engine', 'hbs');
```

#### Creación de la Ruta Dinámica:

Crea una nueva ruta en `app.js` para `/perfil` y usa `res.render()` para pasarle datos:

```js
app.get('/perfil', (req, res) => {
    res.render('perfil', {
        nombre: 'Ana',
        profesion: 'Desarrolladora Web',
    });
});
```

#### Verificación:

Reinicia tu servidor y visita http://localhost:3000/perfil. Deberías ver la página renderizada con los datos de Ana.

## Parte 3: Vistas Avanzadas con Parciales, Condicionales y Helpers 🚀

Aquí es donde aplicaremos los conceptos avanzados para cumplir con los requisitos. Crearemos un "Dashboard de Proyectos" dinámico.

### Instrucciones:

#### Creación de Parciales (Partials):

Los parciales son plantillas de HBS reutilizables (como un header o un footer).

En la raíz de tu proyecto, crea una carpeta llamada `partials`.

Dentro de `partials`, crea dos archivos:

- `header.hbs`: `<header><h1>Dashboard de Proyectos</h1></header><hr>`
- `footer.hbs`: `<hr><footer><p>Copyright 2025 - Mi App Dinámica</p></footer>`

#### Registro de Parciales:

En `app.js`, necesitas decirle a HBS dónde encontrar estos parciales. Para esto, requerimos `hbs` al principio del archivo y lo configuramos:

```js
const express = require('express');
const hbs = require('hbs'); // Requerimos HBS
const app = express();

// ... (config de express.static) ...

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials'); // Registramos los parciales
```

#### Creación de la Vista Principal con Listas Anidadas y Condicionales:

Dentro de la carpeta `views`, crea un nuevo archivo: `dashboard.hbs`.

Modifica este archivo para que use los parciales y la lógica avanzada:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Dashboard</title>
        <link rel="stylesheet" href="/style.css" />
    </head>
    <body>
        {{> header}}
        <h2>Bienvenido, {{user.name}}</h2>
        {{#if user.isAdmin}}
        <p style="color: green;"><strong>Acceso de Administrador</strong></p>
        {{/if}}

        <h3>Tus Proyectos:</h3>
        {{#each projects}}
        <div class="project-card">
            <h4>{{this.name}} - {{#if this.isCompleted}}Completado ✔{{else}}En Progreso ⏳{{/if}}</h4>

            {{#if this.tasks.length}}
            <ul>
                {{#each this.tasks}}
                <li class="{{priorityClass this.priority}}">{{this.description}}</li>
                {{/each}}
            </ul>
            {{else}}
            <p>Este proyecto no tiene tareas asignadas todavía.</p>
            {{/if}}
        </div>
        {{/each}} {{> footer}}
    </body>
</html>
```

#### Registro de un Helper Personalizado:

Los helpers son funciones que puedes usar dentro de tus plantillas. Crearemos uno para asignar una clase CSS según la prioridad de la tarea.

En `app.js`, después de registrar los parciales, registra el siguiente helper:

```js
// Helper para la clase de prioridad
hbs.registerHelper('priorityClass', function (priority) {
    if (priority === 'alta') {
        return 'priority-high';
    } else if (priority === 'media') {
        return 'priority-medium';
    } else {
        return 'priority-low';
    }
});
```

Añade las clases correspondientes en tu `public/style.css` para que el helper tenga un efecto visual:

```
.priority-high { color: red; font-weight: bold; }
.priority-medium { color: orange; }
.priority-low { color: blue; }
```

#### Creación de la Ruta del Dashboard:

En `app.js`, crea la ruta `/dashboard` y pásale un objeto de datos más complejo que incluya listas anidadas y booleanos.

```js
app.get('/dashboard', (req, res) => {
    const data = {
        user: {
            name: 'Carlos',
            isAdmin: true,
        },
        projects: [
            {
                name: 'API Gateway',
                isCompleted: false,
                tasks: [
                    { description: 'Diseñar endpoints', priority: 'alta' },
                    { description: 'Implementar JWT', priority: 'alta' },
                    { description: 'Crear documentación', priority: 'media' },
                ],
            },
            {
                name: 'Refactor del Frontend',
                isCompleted: true,
                tasks: [
                    { description: 'Migrar a React 18', priority: 'baja' },
                    { description: 'Actualizar dependencias', priority: 'baja' },
                ],
            },
            {
                name: 'Base de Datos',
                isCompleted: false,
                tasks: [], // Proyecto sin tareas para probar el condicional 'else'
            },
        ],
    };
    res.render('dashboard', data);
});
```

### Verificación Final:

Reinicia el servidor (`npm start`).

Visita http://localhost:3000/dashboard.

Deberías ver una página completa que:

- Muestra el header y footer de los parciales.
- Saluda a Carlos y muestra el mensaje de "Administrador" gracias al `{{#if}}`.
- Lista cada proyecto, indicando si está completo o en progreso.
- Dentro de cada proyecto, muestra una lista anidada de sus tareas.
- Muestra un mensaje diferente para el proyecto que no tiene tareas.
- Aplica colores distintos a las tareas según su prioridad, gracias al helper personalizado.

## Entrega:

El trabajo deberá ser entregado a través de un repositorio público en GitHub. No olvides incluir un archivo `.gitignore` para la carpeta `node_modules`. El proyecto final debe contener:

- La carpeta `public` con `index.html` y `style.css`.
- La carpeta `views` con `perfil.hbs` y `dashboard.hbs`.
- La carpeta `partials` con `header.hbs` y `footer.hbs`.
- El archivo `app.js` con toda la configuración del servidor, rutas, registro de parciales y el helper.
- El `package.json` y `package-lock.json`.

Por favor, comparte únicamente el enlace a dicho repositorio. 📤
