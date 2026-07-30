import { Router } from 'express'

const router = Router()

const items = [
  { id: 1, name: 'Ejemplo 1', createdAt: new Date() },
  { id: 2, name: 'Ejemplo 2', createdAt: new Date() },
]
let nextId = 3

router.get('/', (_req, res) => {
  res.json(items)
})

router.get('/:id', (req, res) => {
  const item = items.find((i) => i.id === Number(req.params.id))
  item ? res.json(item) : res.status(404).json({ error: 'Not found' })
})

router.post('/', (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).json({ error: 'Name is required' })
    return
  }
  const item = { id: nextId++, name, createdAt: new Date() }
  items.push(item)
  res.status(201).json(item)
})

router.put('/:id', (req, res) => {
  const { name } = req.body
  if (!name) {
    res.status(400).json({ error: 'Name is required' })
    return
  }
  const item = items.find((i) => i.id === Number(req.params.id))
  if (item) {
    item.name = name
    res.json(item)
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

router.delete('/:id', (req, res) => {
  const index = items.findIndex((i) => i.id === Number(req.params.id))
  if (index === -1) {
    res.status(404).json({ error: 'Not found' })
    return
  }
  items.splice(index, 1)
  res.status(204).send()
})

export default router
