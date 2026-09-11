import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { api } from '../utils/api'

export default function ResetPassword() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const token = params.get('token') || ''
  const email = params.get('email') || ''
  const [checking, setChecking] = useState(() => Boolean(token && email))
  const [linkValid, setLinkValid] = useState(false)
  const [form, setForm] = useState({ password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let active = true
    if (!token || !email) {
      return undefined
    }
    api.get(`/api/auth/reset-password/validate?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`, { skipAuthRedirect: true })
      .then((data) => { if (active) setLinkValid(Boolean(data.valid)) })
      .catch(() => { if (active) setLinkValid(false) })
      .finally(() => { if (active) setChecking(false) })
    return () => { active = false }
  }, [token, email])

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setServerError('')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const next = {}
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 6) next.password = 'Use at least 6 characters'
    if (form.confirm !== form.password) next.confirm = 'Passwords do not match'
    setErrors(next)
    if (Object.keys(next).length) return
    setSubmitting(true)
    setServerError('')
    try {
      await api.post('/api/auth/reset-password', { token, email, password: form.password }, { skipAuthRedirect: true })
      setDone(true)
      setTimeout(() => navigate('/login'), 2500)
    } catch (cause) {
      setServerError(cause.message || 'Could not reset password. Please request a new link.')
    } finally {
      setSubmitting(false)
    }
  }

  if (checking) {
    return <AuthLayout eyebrow="Secure reset" title="Checking your reset link" description="We are confirming that this password reset request is still valid."><div className="h-2 overflow-hidden rounded-full bg-surface-3"><span className="block h-full w-1/2 animate-pulse rounded-full bg-indigo-600" /></div></AuthLayout>
  }

  if (!linkValid) {
    return <AuthLayout eyebrow="Secure reset" title="Link expired or invalid" description="Reset links expire after 30 minutes and can only be used once."><Link to="/forgot-password" className="nf-button nf-button-primary min-h-11 w-full">Request a new link</Link></AuthLayout>
  }

  if (done) {
    return <AuthLayout eyebrow="Password updated" title="Your password is ready" description="The new password has been saved securely. You will be redirected to sign in."><Link to="/login" className="nf-button nf-button-primary min-h-11 w-full">Go to sign in</Link></AuthLayout>
  }

  return (
    <AuthLayout eyebrow="Secure reset" title="Create a new password" description={<>Choose a strong password for <strong className="text-fg">{email}</strong>.</>}>
      {serverError && <div className="mb-4 rounded-[10px] border border-danger-line bg-danger-subtle p-3 text-sm text-danger-fg" role="alert">{serverError}</div>}
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <label htmlFor="password" className="block text-sm font-semibold text-fg">New password
          <span className="relative mt-2 block">
            <input id="password" name="password" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.password} onChange={handleChange} className={`nf-field min-h-11 pr-16 ${errors.password ? 'border-danger-line' : ''}`} aria-invalid={Boolean(errors.password)} />
            <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute inset-y-0 right-3 text-xs font-semibold text-indigo-700">{showPassword ? 'Hide' : 'Show'}</button>
          </span>
          <small className={`mt-1.5 block text-xs ${errors.password ? 'text-danger-fg' : 'text-fg-muted'}`}>{errors.password || 'At least 6 characters.'}</small>
        </label>
        <label htmlFor="confirm" className="block text-sm font-semibold text-fg">Confirm password
          <input id="confirm" name="confirm" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={form.confirm} onChange={handleChange} className={`nf-field mt-2 min-h-11 ${errors.confirm ? 'border-danger-line' : ''}`} aria-invalid={Boolean(errors.confirm)} />
          {errors.confirm && <small className="mt-1.5 block text-xs text-danger-fg">{errors.confirm}</small>}
        </label>
        <button type="submit" disabled={submitting} className="nf-button nf-button-primary min-h-11 w-full">{submitting ? 'Updating…' : 'Update password'}</button>
      </form>
    </AuthLayout>
  )
}
