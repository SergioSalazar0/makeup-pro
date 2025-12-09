import express from 'express';
import { getUsuarios, createUsuario } from '../models/usuarios.js';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const usuarios = await getUsuarios();
    res.json(usuarios);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const nuevoUsuario = await createUsuario(nombre, email);
    res.json(nuevoUsuario);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
