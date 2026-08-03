import express from 'express'
import cors from 'cors'
import itemsRouter from './routes/items.js'
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  toggleTodo,
  updateTodo,
} from './handlers.js'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

app.use('/api/items', itemsRouter)

app.get('/api/todos', getTodos)
app.post('/api/todos', createTodo)
app.get('/api/todos/:id', getTodo)
app.put('/api/todos/:id', updateTodo)
app.patch('/api/todos/:id', toggleTodo)
app.delete('/api/todos/:id', deleteTodo)

app.get('/api/health', (req, res) => {
  res.send('Servidor corriendo')
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
