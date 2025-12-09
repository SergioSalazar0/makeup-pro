/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
    "use strict";

    // ----------------------
    // Preloader
    // ----------------------
    setTimeout(function () {
        $('.loader_bg').fadeToggle();
    }, 1500);

    // ----------------------
    // Tooltip
    // ----------------------
    $(document).ready(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    // ----------------------
    // Mouseover para megamenu
    // ----------------------
    $(".main-menu ul li.megamenu").mouseover(function () {
        $("#wrapper").addClass('overlay');
    });
    $(".main-menu ul li.megamenu").mouseleave(function () {
        $("#wrapper").removeClass('overlay');
    });

    // ----------------------
    // Toggle sidebar
    // ----------------------
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $(this).toggleClass('active');
    });

    // ----------------------
    // Registro
    // ----------------------
    $('#formRegistro').on('submit', async function (e) {
        e.preventDefault();

        const nombre = $('input[name="nombre"]').val();
        const email = $('input[name="email"]').val();
        const password = $('input[name="password"]').val();

        try {
            const res = await fetch('http://localhost:3000/usuarios', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });

            const data = await res.json();

            if (!res.ok) return alert(data.error || 'Error registrando usuario');

            alert('Registro exitoso ✅');
            window.location.href = 'login.html';
        } catch (err) {
            console.error(err);
            alert('Error conectando con el servidor');
        }
    });

    // ----------------------
    // Login
    // ----------------------
    $('#formLogin').on('submit', async function (e) {
        e.preventDefault();

        const email = $('input[name="email"]').val();
        const password = $('input[name="password"]').val();

        try {
            const res = await fetch('http://localhost:3000/usuarios');
            const usuarios = await res.json();

            const usuario = usuarios.find(u => u.email === email && u.password === password);

            if (!usuario) return alert('Email o contraseña incorrectos');

            localStorage.setItem('usuarioId', usuario.id);
            alert('Login correcto ✅');
            window.location.href = 'dashboard.html';
        } catch (err) {
            console.error(err);
            alert('Error al iniciar sesión');
        }
    });

    // ----------------------
    // Cargar productos
    // ----------------------
    async function cargarProductos() {
        try {
            const res = await fetch('http://localhost:3000/productos');
            const productos = await res.json();

            let html = '';

            productos.forEach(producto => {
                let imagen = (producto.imagen_url || '').trim();

                // Solo usamos placeholder si no hay valor
                if (!imagen) {
                    imagen = 'https://via.placeholder.com/300x200?text=Sin+Imagen';
                }

                // Precio aleatorio entre 400 y 1000 si no existe
                let precio = producto.precio || Math.floor(Math.random() * (1000 - 400 + 1)) + 400;

                html += `
                <div class="col-xl-3 col-lg-3 col-md-6 col-sm-6 mb-3">
                    <div class="glasses_box">
                        <figure>
                            <img 
                                src="${imagen}" 
                                alt="${producto.nombre}" 
                                style="width:100%; height:200px; object-fit:cover;"
                                onerror="this.src='https://via.placeholder.com/300x200?text=Imagen+No+Disponible';"
                            />
                        </figure>
                        <h3><span class="blu">$</span>${precio}</h3>
                        <p>${producto.nombre}</p>
                        <button onclick="agregarSeleccion(${producto.id})" class="btn btn-primary" style="background-color:#ff69b4; border-color:#ff69b4;">
                            Agregar
                        </button>
                    </div>
                </div>`;
            });

            if ($('.glasses .container-fluid .row').length > 0) {
                $('.glasses .container-fluid .row').html(html);
            }

        } catch (err) {
            console.error('Error cargando productos:', err);
        }
    }

    if ($('.glasses').length > 0) {
        cargarProductos();
    }

    // ----------------------
    // Agregar selección
    // ----------------------
    window.agregarSeleccion = async function (productoId) {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) return alert('Debes iniciar sesión');

        try {
            const res = await fetch('http://localhost:3000/selecciones', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    usuario_id: usuarioId,
                    producto_id: productoId
                })
            });

            if (!res.ok) return alert('Error agregando producto');

            alert('Producto agregado ✅');
        } catch (err) {
            console.error(err);
            alert('Error agregando selección');
        }
    };

    // ----------------------
    // Cargar selecciones
    // ----------------------
    async function cargarSelecciones() {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) return;

        try {
            const res = await fetch('http://localhost:3000/selecciones');
            const data = await res.json();

            const mias = data.filter(s => s.usuario_id == usuarioId);
            $('#misSelecciones').empty();

            mias.forEach(s => {
                $('#misSelecciones').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${s.producto_nombre}
                        <button class="btn btn-sm btn-danger btnEliminarSel" data-id="${s.id}">Eliminar</button>
                    </li>`);
            });
        } catch (err) {
            console.error(err);
        }
    }

    if ($('#misSelecciones').length > 0) {
        cargarSelecciones();
    }

    // ----------------------
    // Eliminar selección
    // ----------------------
    $(document).on('click', '.btnEliminarSel', async function () {
        const id = $(this).data('id');
        if (!confirm('¿Eliminar producto?')) return;

        try {
            const res = await fetch(`http://localhost:3000/selecciones/${id}`, {
                method: 'DELETE'
            });

            if (!res.ok) return alert('Error eliminando');
            cargarSelecciones();
        } catch (err) {
            console.error(err);
        }
    });

    // ----------------------
    // ALERGIAS
    // ----------------------
    async function cargarAlergias() {
        const usuarioId = localStorage.getItem('usuarioId');
        if (!usuarioId) return;

        try {
            const res = await fetch('http://localhost:3000/alergias');
            const alergias = await res.json();

            const mis = alergias.filter(a => a.usuario_id == usuarioId);
            $('#misAlergias').empty();

            mis.forEach(a => {
                $('#misAlergias').append(`
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        ${a.descripcion}
                        <button class="btn btn-sm btn-danger btnDelAlergia" data-id="${a.id}">Eliminar</button>
                    </li>`);
            });
        } catch (err) {
            console.error(err);
        }
    }

    if ($('#misAlergias').length > 0) {
        cargarAlergias();
    }

    // ----------------------
    // Guardar alergias
    // ----------------------
    $('#formAlergia').on('submit', async function (e) {
        e.preventDefault();

        const descripcion = $(this).find('textarea[name="descripcion"]').val();
        const usuario_id = localStorage.getItem('usuarioId');

        try {
            const res = await fetch('http://localhost:3000/alergias', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usuario_id, descripcion })
            });

            if (!res.ok) return alert('Error guardando alergia');

            $(this)[0].reset();
            alert('Alergia guardada ✅');
            cargarAlergias();
        } catch (err) {
            console.error(err);
        }
    });

    // ----------------------
    // Eliminar alergia
    // ----------------------
    $(document).on('click', '.btnDelAlergia', async function () {
        const id = $(this).data('id');
        if (!confirm('¿Eliminar alergia?')) return;

        try {
            await fetch(`http://localhost:3000/alergias/${id}`, { method: 'DELETE' });
            cargarAlergias();
        } catch (err) {
            console.error(err);
        }
    });

});
