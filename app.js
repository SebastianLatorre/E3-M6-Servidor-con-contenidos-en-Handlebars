const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuración de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del motor de vistas Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Registro de parciales
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Helper personalizado para clases de prioridad
hbs.registerHelper('priorityClass', function (priority) {
    if (priority === 'alta') {
        return 'priority-high';
    } else if (priority === 'media') {
        return 'priority-medium';
    } else {
        return 'priority-low';
    }
});

// Rutas
// Ruta raíz - sirve index.html de public automáticamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta de perfil - renderizado dinámico simple
app.get('/perfil', (req, res) => {
    res.render('perfil', {
        nombre: 'Ana',
        profesion: 'Desarrolladora Web',
    });
});

// Ruta del dashboard - vista avanzada con parciales, condicionales y helpers
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

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1><a href="/">Volver al inicio</a>');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`   - Inicio: http://localhost:${PORT}/`);
    console.log(`   - Perfil: http://localhost:${PORT}/perfil`);
    console.log(`   - Dashboard: http://localhost:${PORT}/dashboard`);
});
