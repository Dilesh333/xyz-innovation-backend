import { Router } from 'express'
import Service from '../models/Service.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/services - public list
router.get('/', async (_req, res) => {
  const items = await Service.find().sort({ createdAt: -1 })
  res.json(items)
})

// POST /api/services - protected create
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, description, emoji, imageUrl } = req.body || {}
    if (!title || !description) return res.status(400).json({ error: 'title and description are required' })
    const created = await Service.create({ title, description, emoji, imageUrl })
    res.status(201).json(created)
  } catch (e) {
    res.status(500).json({ error: 'Failed to create service' })
  }
})

// PATCH /api/services/:id - protected update
router.patch('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Service.findByIdAndUpdate(id, req.body, { new: true })
    if (!updated) return res.status(404).json({ error: 'Not found' })
    res.json(updated)
  } catch (e) {
    res.status(500).json({ error: 'Failed to update service' })
  }
})

// DELETE /api/services/:id - protected delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Service.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete service' })
  }
})

export default router
