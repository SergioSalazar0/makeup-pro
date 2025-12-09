$(function () {
    "use strict";

    $('#formLogin').on('submit', async function(e) {
        e.preventDefault(); // Evita que se recargue la página

        const form = $(this);
        const email = form.find('input[name="email"]').val();
        const password = form.find('input[name="password"]').val();

        try {
            // Obtener todos los usuarios
            const res = await fetch('http://localhost:3000/usuarios');
            const usuarios = await res.json();

            // Buscar usuario con email y password correctos
            const usuario = usuarios.find(u => u.email === email && u.password === password);

            if (usuario) {
                // Guardar el id del usuario en localStorage
                localStorage.setItem('usuarioId', usuario.id);
                alert(`¡Bienvenido, ${usuario.nombre}!`);

                // Redirigir al dashboard
                window.location.href = 'dashboard.html';
            } else {
                alert('Email o contraseña incorrectos');
            }

            form[0].reset();

        } catch (err) {
            console.error('Error al iniciar sesión:', err);
            alert('Error conectando con el servidor');
        }
    });
});
