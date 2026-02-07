const express = require('express');
const hbs = require('hbs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

hbs.registerHelper('priorityClass', function (priority) {
    if (priority === 'alta') {
        return 'priority-high';
    } else if (priority === 'media') {
        return 'priority-medium';
    } else {
        return 'priority-low';
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/perfil', (req, res) => {
    res.render('perfil', {
        nombre: 'Ana',
        profesion: 'Desarrolladora Web',
    });
});

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
                tasks: [],
            },
        ],
    };
    res.render('dashboard', data);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 - Página no encontrada</h1><a href="/">Volver al inicio</a>');
});

app.listen(PORT, () => {
    console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
    console.log(`   - Inicio: http://localhost:${PORT}/`);
    console.log(`   - Perfil: http://localhost:${PORT}/perfil`);
    console.log(`   - Dashboard: http://localhost:${PORT}/dashboard`);
});
