<<<<<<< HEAD
// M3 - Phase 2 - utils/writeAuditLog.js
// Fire-and-forget audit writer. NEVER throws — audit failure must not break
// the action being audited.

const AuditLog = require('../models/AuditLog')

const writeAuditLog = async ({
  action,
  performedBy,
  targetEntity,
  department,
  ipAddress,
  detail,
  metadata = {}
}) => {
  try {
    if (!performedBy || !action || !targetEntity) return null
    return await AuditLog.create({
      action,
      performedBy,
      targetEntity,
      department,
      ipAddress,
      detail,
      metadata
    })
  } catch (err) {
    console.error('writeAuditLog error:', err.message)
    return null
  }
}

module.exports = { writeAuditLog }
=======
// M3 - Phase 2 - utils/writeAuditLog.js
// Fire-and-forget audit writer. NEVER throws — audit failure must not break
// the action being audited.

const AuditLog = require('../models/AuditLog')

const writeAuditLog = async ({
  action,
  performedBy,
  targetEntity,
  department,
  ipAddress,
  detail,
  metadata = {}
}) => {
  try {
    if (!performedBy || !action || !targetEntity) return null
    return await AuditLog.create({
      action,
      performedBy,
      targetEntity,
      department,
      ipAddress,
      detail,
      metadata
    })
  } catch (err) {
    console.error('writeAuditLog error:', err.message)
    return null
  }
}

module.exports = { writeAuditLog }
>>>>>>> 23f6249ac261c7908be2e120359f8eb01770d5e8
