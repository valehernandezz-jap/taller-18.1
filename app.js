import express from 'express'
import mariadb from 'mariadb'

const app = express()
app.use(express.json())
const port = 3000

// Conexión a la base de datos con mariadb
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  connectionLimit: process.env.DB_CONNECTION_LIMIT
})

// Endpoint para verificar que el servidor esté activo
app.get('/', (req, res) => {
  res.send('✅ Servidor funcionando')
})

// Obtener todas las tareas (GET)
app.get('/todo', async (req, res) => {
  let conn
  try {
    conn = await pool.getConnection()
    const rows = await conn.query(`SELECT * FROM todo`)
    res.status(202).json(rows)
  } catch (err) {
    res.status(500).json({ message: err })
  } finally {
    if (conn) conn.end()
  }
})

// Obtener una tarea por ID (GET)
app.get('/todo/:id', async (req, res) => {
  let conn
  try {
    const { id } = req.params
    conn = await pool.getConnection()
    const rows = await conn.query(`SELECT * FROM todo WHERE id = ?`, [id])
    res.status(200).json(rows[0])
  } catch (err) {
    res.status(500).json({ message: err })
  } finally {
    if (conn) conn.end()
  }
})

// Crear una tarea (POST)
app.post('/todo', async (req, res) => {
  let conn
  try {
    const { name, description, status } = req.body
    conn = await pool.getConnection()
    const result = await conn.query(
      `INSERT INTO todo (name, description, status) VALUES (?, ?, ?)`,
      [name, description, status]
    )
    res.status(202).json({
      message: 'Tarea creada con éxito',
      task: { ...req.body }
    })
  } catch (err) {
    res.status(500).json({ message: err })
  } finally {
    if (conn) conn.end()
  }
})

// Actualizar una tarea (PATCH)
app.patch('/todo/:id', async (req, res) => {
  let conn
  try {
    const { id } = req.params
    const { name, description, status } = req.body
    conn = await pool.getConnection()
    await conn.query(
      `UPDATE todo SET name = ?, description = ?, status = ? WHERE id = ?`,
      [name, description, status, id]
    )
    res.status(200).json({
      message: 'Tarea editada con éxito',
      task: { ...req.body }
    })
  } catch (err) {
    res.status(500).json({ message: err })
  } finally {
    if (conn) conn.end()
  }
})

// Eliminar una tarea (DELETE)
app.delete('/todo/:id', async (req, res) => {
  let conn
  try {
    const { id } = req.params
    conn = await pool.getConnection()
    await conn.query(`DELETE FROM todo WHERE id = ?`, [id])
    res.status(200).json({ message: 'Tarea eliminada con éxito' })
  } catch (err) {
    res.status(500).json({ message: err })
  } finally {
    if (conn) conn.end()
  }
})

// Configuración del puerto para el servidor
app.listen(port, () => {
  console.log(`🖧 Servidor escuchando en http://localhost:${port}`)
})
