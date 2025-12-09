import express from "express";
import pool from "./db.js";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------
// __dirname config
// ---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------------
// Middlewares
// ---------------------------
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ SIRVE FRONTEND
app.use(express.static(path.join(__dirname, "../frontend")));

// ✅ SIRVE IMÁGENES (AGREGADO SIN ROMPER NADA)
app.use("/images", express.static(path.resolve(__dirname, "../frontend/images")));


// ---------------------------
// HTML routes
// ---------------------------
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/login.html"));
});

app.get("/register.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/register.html"));
});

app.get("/dashboard.html", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

// ---------------------------
// USERS
// ---------------------------
app.post("/usuarios", async (req, res) => {
    const { nombre, email, password } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
            [nombre, email, password]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error usuario:", err);
        res.status(400).json({ error: "Error registrando usuario" });
    }
});

app.get("/usuarios", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM usuarios");
        res.json(result.rows);
    } catch (err) {
        console.error("Error usuarios:", err);
        res.status(500).json({ error: "Error obteniendo usuarios" });
    }
});

// ---------------------------
// PRODUCTOS
// ---------------------------
app.get("/productos", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM productos");
        res.json(result.rows);
    } catch (err) {
        console.error("Error productos:", err);
        res.status(500).json({ error: "Error obteniendo productos" });
    }
});

app.post("/productos", async (req, res) => {
    const { id, nombre, marca, color, imagen_url } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO productos (id, nombre, marca, color, imagen_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, nombre, marca, color, imagen_url]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error productos POST:", err);
        res.status(400).json({ error: "Error agregando producto" });
    }
});

// ---------------------------
// SELECCIONES
// ---------------------------
app.post("/selecciones", async (req, res) => {
    const { usuario_id, producto_id } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO selecciones (usuario_id, producto_id) VALUES ($1, $2) RETURNING *",
            [usuario_id, producto_id]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error selecciones:", err);
        res.status(400).json({ error: "Error agregando selección" });
    }
});

app.get("/selecciones", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT s.*, p.nombre as producto_nombre
            FROM selecciones s
            JOIN productos p ON s.producto_id = p.id
        `);
        res.json(result.rows);
    } catch (err) {
        console.error("Error selecciones GET:", err);
        res.status(500).json({ error: "Error obteniendo selecciones" });
    }
});

app.delete("/selecciones/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const result = await pool.query(
            "DELETE FROM selecciones WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No encontrada" });
        }

        res.json({ message: "Eliminada correctamente" });
    } catch (err) {
        console.error("Error DELETE selección:", err);
        res.status(500).json({ error: "Error eliminando" });
    }
});

// ---------------------------
// ALERGIAS
// ---------------------------
app.post("/alergias", async (req, res) => {
    let { usuario_id, descripcion } = req.body;

    try {
        const userId = parseInt(usuario_id);

        if (isNaN(userId)) {
            return res.status(400).json({ error: "usuario_id inválido" });
        }

        if (!descripcion || descripcion.trim() === "") {
            return res.status(400).json({ error: "Descripción vacía" });
        }

        const result = await pool.query(
            "INSERT INTO alergias (usuario_id, descripcion) VALUES ($1, $2) RETURNING *",
            [userId, descripcion.trim()]
        );

        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error("Error alergias POST:", err);
        res.status(500).json({ error: "Error guardando alergia" });
    }
});

app.get("/alergias", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM alergias");
        res.json(result.rows);
    } catch (err) {
        console.error("Error alergias GET:", err);
        res.status(500).json({ error: "Error obteniendo alergias" });
    }
});

app.delete("/alergias/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const result = await pool.query(
            "DELETE FROM alergias WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ error: "No encontrada" });
        }

        res.json({ message: "Alergia eliminada correctamente" });
    } catch (err) {
        console.error("Error DELETE alergia:", err);
        res.status(500).json({ error: "Error eliminando alergia" });
    }
});

// ---------------------------
// SERVER
// ---------------------------
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
