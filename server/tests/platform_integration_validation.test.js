const assert = require('node:assert/strict')
const jwt = require('jsonwebtoken')

process.env.JWT_SECRET = process.env.JWT_SECRET || 'platform-integration-unit-secret'

const dms = require('../services/dmsClient')
const s3 = require('../services/s3Client')
const {
  issueIntegrationReceipt,
  receiptMatches
} = require('../utils/integrationVerification')

const originalFetch = global.fetch
const originalDmsEnv = {
  enabled: process.env.DMS_ENABLED,
  url: process.env.DMS_API_URL,
  key: process.env.DMS_API_KEY,
  jwt: process.env.DMS_JWT
}

const restoreEnv = (key, value) => {
  if (value === undefined) delete process.env[key]
  else process.env[key] = value
}

async function run() {
  const receiptConfig = { bucket: 'tenant-files', secretAccessKey: 'not-returned' }
  const issued = issueIntegrationReceipt({ integration: 's3', config: receiptConfig, actorId: 'admin-1' })
  assert.equal(receiptMatches({ receipt: issued.verificationReceipt, integration: 's3', config: receiptConfig, actorId: 'admin-1' }), true)
  assert.equal(receiptMatches({ receipt: issued.verificationReceipt, integration: 's3', config: { ...receiptConfig, bucket: 'changed' }, actorId: 'admin-1' }), false)
  assert.equal(receiptMatches({ receipt: issued.verificationReceipt, integration: 's3', config: receiptConfig, actorId: 'admin-2' }), false)
  assert.equal(JSON.stringify(jwt.decode(issued.verificationReceipt)).includes('not-returned'), false)

  process.env.DMS_ENABLED = 'true'
  process.env.DMS_API_URL = 'https://dms.test/api'
  process.env.DMS_API_KEY = 'environment-key'
  delete process.env.DMS_JWT
  let dmsRequest = null
  global.fetch = async (url, options) => {
    dmsRequest = { url, options }
    return new Response(JSON.stringify({ documents: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  const dmsResult = await dms.testConnection({ orgSlug: 'Acme Org' })
  assert.equal(dmsResult.checks.every((check) => check.status === 'passed'), true)
  assert.match(dmsRequest.url, /\/documents\?limit=1&offset=0$/)
  assert.equal(dmsRequest.options.headers['X-Api-Key'], 'environment-key')

  const calls = []
  const fakeS3 = {
    send: async (command) => {
      calls.push(command.constructor.name)
      return {}
    }
  }
  const s3Config = {
    bucket: 'tenant-files', region: 'auto', endpoint: '',
    accessKeyId: 'access', secretAccessKey: 'secret'
  }
  const s3Result = await s3.testConnection(s3Config, { client: fakeS3 })
  assert.deepEqual(calls, ['PutObjectCommand', 'DeleteObjectCommand'])
  assert.equal(s3Result.checks.every((check) => check.status === 'passed'), true)

  await assert.rejects(
    () => s3.testConnection({ bucket: 'tenant-files' }, { client: fakeS3 }),
    (error) => error.code === 'INVALID_INTEGRATION_CONFIG'
  )

  const deleteDenied = {
    send: async (command) => {
      if (command.constructor.name === 'DeleteObjectCommand') {
        const error = new Error('provider detail must not escape')
        error.name = 'AccessDenied'
        throw error
      }
      return {}
    }
  }
  await assert.rejects(
    () => s3.testConnection(s3Config, { client: deleteDenied }),
    (error) => error.code === 'S3_DELETE_FAILED' && !error.message.includes('provider detail')
  )

  console.log('platform integration validation tests passed')
}

run()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => {
    global.fetch = originalFetch
    restoreEnv('DMS_ENABLED', originalDmsEnv.enabled)
    restoreEnv('DMS_API_URL', originalDmsEnv.url)
    restoreEnv('DMS_API_KEY', originalDmsEnv.key)
    restoreEnv('DMS_JWT', originalDmsEnv.jwt)
  })
