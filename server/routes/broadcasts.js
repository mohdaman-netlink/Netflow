<<<<<<< HEAD
const express = require('express')

const PlatformBroadcast = require('../models/PlatformBroadcast')
const { protect } = require('../middleware/auth')
const { sendSuccess } = require('../utils/apiResponse')

const router = express.Router()

router.get('/active', protect, async (req, res, next) => {
  try {
    const broadcast = await PlatformBroadcast.findOne({
      supersededAt: null,
      expiresAt: { $gt: new Date() }
    })
      .select('message severity expiresAt createdAt')
      .sort({ createdAt: -1 })
      .lean()

    return sendSuccess(res, { broadcast: broadcast || null })
  } catch (err) {
    next(err)
  }
})

module.exports = router
=======
const express = require('express')

const PlatformBroadcast = require('../models/PlatformBroadcast')
const { protect } = require('../middleware/auth')
const { sendSuccess } = require('../utils/apiResponse')

const router = express.Router()

router.get('/active', protect, async (req, res, next) => {
  try {
    const broadcast = await PlatformBroadcast.findOne({
      supersededAt: null,
      expiresAt: { $gt: new Date() }
    })
      .select('message severity expiresAt createdAt')
      .sort({ createdAt: -1 })
      .lean()

    return sendSuccess(res, { broadcast: broadcast || null })
  } catch (err) {
    next(err)
  }
})

module.exports = router
>>>>>>> 23f6249ac261c7908be2e120359f8eb01770d5e8
