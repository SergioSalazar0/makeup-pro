import pool from "./db.js";

async function testInsert() {
    try {
        const result = await pool.query(
            "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING *",
            ["Test User", "test@example.com", "1234"]
        );
        console.log("Usuario insertado:", result.rows[0]);
    } catch (err) {
        console.error("Error insertando usuario:", err);
    } finally {
        pool.end();
    }
}

testInsert();
