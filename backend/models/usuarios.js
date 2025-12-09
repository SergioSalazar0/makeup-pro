import pool from '../db.js';

export const getUsuarios = async () => {
  const result = await pool.query('SELECT * FROM usuarios');
  return result.rows;
};

export const createUsuario = async (nombre, email) => {
  const result = await pool.query(
    'INSERT INTO usuarios(nombre, email) VALUES($1, $2) RETURNING *',
    [nombre, email]
  );
  return result.rows[0];
};
