import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

// Simple email/password login using env vars
// POST /api/auth/login { email, password }
router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@xyz.com'
  const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123'
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'dev-secret', {
      expiresIn: '7d',
    })
    return res.json({ token })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
})

export default router
