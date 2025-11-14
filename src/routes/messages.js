import { Router } from 'express'
import Message from '../models/Message.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

// GET /api/messages - protected list
router.get('/', requireAuth, async (_req, res) => {
  const items = await Message.find().sort({ createdAt: -1 })
  res.json(items)
})

// POST /api/messages - public create (from contact form)
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body || {}
    if (!name || !email || !message) return res.status(400).json({ error: 'name, email, message are required' })
    const created = await Message.create({ name, email, message })
    res.status(201).json(created)
  } catch (e) {
    res.status(500).json({ error: 'Failed to send message' })
  }
})

// PATCH /api/messages/:id/toggle - protected toggle read
router.patch('/:id/toggle', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const found = await Message.findById(id)
    if (!found) return res.status(404).json({ error: 'Not found' })
    found.isRead = !found.isRead
    await found.save()
    res.json(found)
  } catch (e) {
    res.status(500).json({ error: 'Failed to toggle message' })
  }
})

// DELETE /api/messages/:id - protected delete
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Message.findByIdAndDelete(id)
    if (!deleted) return res.status(404).json({ error: 'Not found' })
    res.json({ ok: true })
  } catch (e) {
    res.status(500).json({ error: 'Failed to delete message' })
  }
})

export default router
