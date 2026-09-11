import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import { authStore, useUser } from '../utils/auth'
import { toast } from '../lib/toastStore'

export default function ChangePassword() {
  const navigate = useNavigate()
  const user = useUser()
  const forced = Boolean(user?.mustChangePassword)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [show, setShow] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [touchedConfirm, setTouchedConfirm] = useState(false)
  const mismatch = confirm.length > 0 && newPassword !== confirm
  const showMismatch = touchedConfirm && mismatch

  const submit = async (event) => {
    event.preventDefault()
    setError('')
    setTouchedConfirm(true)
    if (!forced && !currentPassword) return setError('Enter your current password')
    if (newPassword.length < 6) return setError('New password must be at least 6 characters')
    if (newPassword !== confirm) return setError('Passwords do not match')
    setBusy(true)
    try {
      await authStore.changePassword(forced ? undefined : currentPassword, newPassword)
      toast.success('Password updated')
      navigate('/dashboard', { replace: true })
    } catch (cause) {
      setError(cause.message || 'Could not change the password')
    } finally {
      setBusy(false)
    }
  }

  const fieldClass = (invalid = false) => `nf-field mt-2 min-h-11 ${invalid ? 'border-danger-line' : ''}`

  return (
    <AuthLayout
      eyebrow={forced ? 'First sign-in security' : 'Account security'}
      title={forced ? 'Set a new password' : 'Change your password'}
      description={forced ? 'Replace the temporary password before entering your workspace.' : 'Confirm your current password, then choose a new secure password.'}
    >
      {error && <div className="mb-4 rounded-[10px] border border-danger-line bg-danger-subtle p-3 text-sm text-danger-fg" role="alert">{error}</div>}
      <form onSubmit={submit} className="space-y-5">
        {!forced && (
          <label className="block text-sm font-semibold text-fg">Current password
            <input type={show ? 'text' : 'password'} value={currentPassword} onChange={(event) => { setCurrentPassword(event.target.value); setError('') }} autoComplete="current-password" className={fieldClass(Boolean(error && !currentPassword))} />
          </label>
        )}
        <label className="block text-sm font-semibold text-fg">New password
          <input type={show ? 'text' : 'password'} value={newPassword} onChange={(event) => { setNewPassword(event.target.value); setError('') }} autoComplete="new-password" className={fieldClass(Boolean(error && newPassword.length < 6))} />
          <small className="mt-1.5 block text-xs text-fg-muted">Use at least 6 characters.</small>
        </label>
        <label className="block text-sm font-semibold text-fg">Confirm new password
          <input type={show ? 'text' : 'password'} value={confirm} onChange={(event) => { setConfirm(event.target.value); setTouchedConfirm(true); setError('') }} onBlur={() => setTouchedConfirm(true)} autoComplete="new-password" aria-invalid={showMismatch} className={fieldClass(showMismatch)} />
          {showMismatch && <small className="mt-1.5 block text-xs font-medium text-danger-fg" role="alert">Passwords do not match</small>}
        </label>
        <label className="flex items-center gap-2 text-xs text-fg-muted"><input type="checkbox" checked={show} onChange={(event) => setShow(event.target.checked)} className="h-4 w-4 rounded border-line accent-[#245a9a]" />Show passwords</label>
        <button type="submit" disabled={busy} className="nf-button nf-button-primary min-h-11 w-full">{busy ? 'Saving…' : forced ? 'Set password and continue' : 'Update password'}</button>
      </form>
      <div className="mt-6 text-sm">
        {!forced ? <Link to="/profile" className="font-semibold text-indigo-700 hover:text-indigo-800">Back to profile</Link> : <button type="button" onClick={() => authStore.logout().then(() => navigate('/login', { replace: true }))} className="font-semibold text-fg-muted hover:text-fg">Sign out</button>}
      </div>
    </AuthLayout>
  )
}
