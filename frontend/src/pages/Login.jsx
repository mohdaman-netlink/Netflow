// M1 - Phase 2 - Login.jsx - Wired to POST /api/auth/login

import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  Eye,
  EyeOff,
  FileText,
  KeyRound,
  LockKeyhole,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Workflow,
} from 'lucide-react'
import { authStore } from '../utils/auth'
import { api, API_BASE } from '../utils/api'
import { detectWorkspace } from '../utils/workspace'

// Friendly copy for the ?sso_error=... codes the SSO callback can bounce back.
const SSO_ERROR_MESSAGES = {
  nouser: "This Microsoft account isn't registered. Ask your administrator to add you first.",
  inactive: 'Your account is deactivated. Contact your administrator.',
  state: 'Your sign-in session expired. Please try again.',
  nocode: 'Microsoft sign-in was cancelled or failed. Please try again.',
  noemail: "We couldn't read an email from your Microsoft account.",
  session: 'Could not start your session. Please try again.',
  disabled: 'Microsoft sign-in is not available right now.',
  failed: 'Microsoft sign-in failed. Please try again.',
}

function BrandLockup() {
  return (
    <div className="nf-login-brand">
      <Link to="/">
        <img className="nf-login-brand-mark" src="/netflow-icon.png" alt="" />
      </Link>
      <span>
        <strong>NetFlow</strong>
        <small>AI Powered IT Service Management</small>
      </span>
    </div>
  )
}

function ProductFeature({ icon: Icon, title, children }) {
  return (
    <div className="nf-login-feature">
      <span className="nf-login-feature-icon"><Icon aria-hidden="true" /></span>
      <span>
        <strong>{title}</strong>
        <small>{children}</small>
      </span>
    </div>
  )
}

function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', remember: false })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState(() => {
    const code = new URLSearchParams(window.location.search).get('sso_error')
    return code ? (SSO_ERROR_MESSAGES[code] || 'Microsoft sign-in failed. Please try again.') : ''
  })
  const [attemptsLeft, setAttemptsLeft] = useState(null)
  const [locked, setLocked] = useState(false)

  // MFA flow: 'login' | 'mfa' (enter code) | 'setup' (opt-in enrol) | 'backup' (show codes)
  const [step, setStep] = useState('login')
  const [challenge, setChallenge] = useState('')
  const [code, setCode] = useState('')
  const [setupData, setSetupData] = useState(null)   // { qr, manualKey }
  const [backupCodes, setBackupCodes] = useState([])
  const [mfaError, setMfaError] = useState('')
  const [busy, setBusy] = useState(false)

  const [ssoEnabled, setSsoEnabled] = useState(false)

  // Step 9 — subdomain routing. Which workspace (org) is being signed in to.
  const [workspace] = useState(() => detectWorkspace())
  // orgContext: null (still loading / bare domain), { name, status } when known,
  // or { unknown: true } when the subdomain matches no organization.
  const [orgContext, setOrgContext] = useState(null)

  // Show the SSO button only when the server has Microsoft credentials, and
  // surface any error the SSO callback redirected back with.
  useEffect(() => {
    api.get('/api/auth/sso/config')
      .then((d) => setSsoEnabled(!!d.microsoft))
      .catch(() => setSsoEnabled(false))

    const params = new URLSearchParams(window.location.search)
    const err = params.get('sso_error')
    if (err) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  // Resolve the workspace org so we can show its name and warn on suspended /
  // unknown workspaces before the user even types a password.
  useEffect(() => {
    if (!workspace) return
    api.get(`/api/auth/org-context?subdomain=${encodeURIComponent(workspace)}`)
      .then((d) => {
        if (d.org) setOrgContext(d.org)
        else setOrgContext({ unknown: true })
      })
      .catch(() => setOrgContext(null))
  }, [workspace])

  const orgSuspended = !!(orgContext && orgContext.status === 'suspended')
  const orgUnknown = !!(orgContext && orgContext.unknown)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }))
    setErrors((p) => ({ ...p, [name]: '' }))
    setServerError('')
    setAttemptsLeft(null)
    setLocked(false)
  }

  const validate = () => {
    const next = {}
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) next.email = 'Email is required'
    else if (!emailPattern.test(form.email)) next.email = 'Enter a valid email address'
    if (!form.password) next.password = 'Password is required'
    else if (form.password.length < 6) next.password = 'Password must be at least 6 characters'
    return next
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    setErrors(v)
    if (Object.keys(v).length > 0) return
    setSubmitting(true)
    setServerError('')
    setAttemptsLeft(null)
    setLocked(false)
    try {
      const res = await authStore.login(form.email.trim(), form.password, workspace)
      if (res.status === 'ok') {
        navigate('/dashboard')
      } else if (res.status === 'mfa') {
        setChallenge(res.challenge)
        setCode('')
        setMfaError('')
        setStep('mfa')
      } else if (res.status === 'setup') {
        setChallenge(res.challenge)
        setCode('')
        setMfaError('')
        setStep('setup')
        try {
          const d = await authStore.mfaSetupWithChallenge(res.challenge)
          setSetupData(d)
        } catch (err) {
          setMfaError(err.message || 'Could not start MFA setup')
        }
      }
    } catch (err) {
      setServerError(err.message || 'Login failed')
      if (err.code === 'ACCOUNT_LOCKED') {
        setLocked(true)
      } else if (err.data && typeof err.data.attemptsRemaining === 'number') {
        setAttemptsLeft(err.data.attemptsRemaining)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const submitMfaVerify = async (e) => {
    e.preventDefault()
    if (!code.trim()) return setMfaError('Enter the 6-digit code')
    setBusy(true)
    setMfaError('')
    try {
      await authStore.completeMfa(challenge, code.trim())
      navigate('/dashboard')
    } catch (err) {
      setMfaError(err.message || 'Invalid code')
    } finally {
      setBusy(false)
    }
  }

  const submitMfaEnable = async (e) => {
    e.preventDefault()
    if (!code.trim()) return setMfaError('Enter the 6-digit code from your app')
    setBusy(true)
    setMfaError('')
    try {
      const d = await authStore.mfaEnableWithChallenge(challenge, code.trim())
      setBackupCodes(d.backupCodes || [])
      setStep('backup')
    } catch (err) {
      setMfaError(err.message || 'Invalid code')
    } finally {
      setBusy(false)
    }
  }

  const backToLogin = () => {
    setStep('login')
    setChallenge('')
    setCode('')
    setSetupData(null)
    setMfaError('')
  }

  return (
    <div className="nf-saas-login-page">
      <aside className="nf-saas-login-product" aria-label="NetFlow product overview">
        <div className="nf-saas-login-dots" aria-hidden="true" />
        <div className="nf-saas-login-orb" aria-hidden="true" />
        <div className="relative z-10">
          <BrandLockup />
        </div>

        <div className="nf-saas-login-product-content">
          <p className="nf-saas-login-kicker">
            <Sparkles aria-hidden="true" />
            Manual Control • AI Assistance • Automation
          </p>
          <h2>
            One place to build,
            <span className="nf-saas-login-headline-line"><em>automate</em>, approve,</span>
            <span className="nf-saas-login-headline-line">and track work</span>
          </h2>
          <p className="nf-saas-login-product-copy">
            Create forms and workflows your way—build manually for complete control, use AI to get started faster,
            or combine both for the perfect process.
          </p>

          <div className="nf-saas-login-features">
            <ProductFeature icon={FileText} title="Build Your Way">Design custom forms and workflows step by step.</ProductFeature>
            <ProductFeature icon={Sparkles} title="Create with AI">Describe your process and let AI create a structured starting point.</ProductFeature>
            <ProductFeature icon={Workflow} title="Automate and Track">Route approvals, assign ownership, and monitor every step.</ProductFeature>
          </div>

          <p className="nf-saas-login-assurance">
            <Check aria-hidden="true" />
            Start manually, start with AI, or seamlessly combine both.
          </p>
        </div>

        <div className="nf-saas-login-wave" aria-hidden="true">
          <svg viewBox="0 0 1050 340" preserveAspectRatio="none">
            <defs>
              <linearGradient id="netflow-wave-soft" x1="0" y1="0" x2="1" y2=".8">
                <stop stopColor="var(--color-brand-100)" />
                <stop offset=".72" stopColor="var(--color-brand-50)" />
                <stop offset="1" stopColor="#F8F9FF" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="netflow-wave-main" x1="0" y1=".25" x2=".88" y2="1">
                <stop stopColor="var(--color-primary)" />
                <stop offset=".5" stopColor="var(--color-brand-500)" />
                <stop offset="1" stopColor="var(--color-primary-line)" stopOpacity=".18" />
              </linearGradient>
            </defs>
            <path d="M0 10C152 43 246 168 405 215C570 264 690 199 816 222C915 240 985 286 1050 306V340H0Z" fill="url(#netflow-wave-soft)" />
            <path d="M0 83C159 66 274 157 431 237C585 315 738 322 900 340H0Z" fill="var(--color-brand-300)" fillOpacity=".4" />
            <path d="M0 101C145 79 266 151 427 238C585 324 724 334 858 340H0Z" fill="url(#netflow-wave-main)" />
            <path d="M0 146C151 119 282 171 430 253C565 328 654 338 738 340H0Z" fill="var(--color-primary-active)" fillOpacity=".82" />
            <path d="M0 86C181 60 286 125 426 196C579 274 744 306 955 340" fill="none" stroke="var(--color-brand-400)" strokeOpacity=".34" strokeWidth="1.5" />
          </svg>
        </div>
      </aside>

      <main className="nf-saas-login-form-area">
        <div className="nf-saas-login-form-wrap">
          <div className="nf-saas-login-mobile-brand lg:hidden">
            <BrandLockup />
          </div>
          <section className="nf-saas-login-card" aria-label="Sign in to NetFlow">

          {step === 'login' && (
            <>
             

              {orgContext && !orgUnknown && (
                <div className="nf-saas-workspace-badge">
                  <Building2 aria-hidden="true" />
                  <span>{orgContext.name}</span>
                  <Check aria-hidden="true" />
                </div>
              )}
              <h1 className="nf-saas-login-heading">Welcome back</h1>
              <p className="nf-saas-login-subtitle">
                {orgContext && !orgUnknown
                  ? <>Sign in to access <strong>{orgContext.name}</strong></>
                  : 'Sign in to access your forms, workflows, approvals, and AI assistant.'}
              </p>

              {orgSuspended && (
                <div className="nf-saas-login-alert nf-saas-login-alert-danger" role="alert">
                  <ShieldAlert aria-hidden="true" />
                  <span>This workspace is suspended. Contact your platform administrator.</span>
                </div>
              )}
              {orgUnknown && (
                <div className="nf-saas-login-alert nf-saas-login-alert-warning" role="alert">
                  <ShieldAlert aria-hidden="true" />
                  <span>Unknown workspace &quot;{workspace}&quot;. Check the address and try again.</span>
                </div>
              )}

              {serverError && (
                <div
                  className={`nf-saas-login-alert ${attemptsLeft !== null && !locked ? 'nf-saas-login-alert-warning' : 'nf-saas-login-alert-danger'}`}
                  role="alert"
                  aria-live="assertive"
                >
                  {locked ? <LockKeyhole aria-hidden="true" /> : <ShieldAlert aria-hidden="true" />}
                  <span>
                    {serverError}
                    {attemptsLeft === 1 && !locked && (
                      <strong className="mt-1 block">This is your last try - one more failure locks your account.</strong>
                    )}
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="nf-saas-login-form">
                {/* Email */}
                <div>
                  <label htmlFor="email" className="nf-saas-login-label">
                    Email address
                  </label>
                  <div className={`nf-saas-login-input ${errors.email ? 'nf-saas-login-input-error' : ''}`}>
                    <Mail aria-hidden="true" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter Your Email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                    />
                  </div>
                  {errors.email && <p id="email-error" className="nf-saas-login-field-error">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="nf-saas-login-label">
                    Password
                  </label>
                  <div className={`nf-saas-login-input ${errors.password ? 'nf-saas-login-input-error' : ''}`}>
                    <LockKeyhole aria-hidden="true" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      className="nf-saas-login-control"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <button
                      type="button"
                      className="nf-saas-password-toggle"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <Eye aria-hidden="true" /> : <EyeOff aria-hidden="true" />}
                    </button>
                  </div>
                  {errors.password && <p id="password-error" className="nf-saas-login-field-error">{errors.password}</p>}
                </div>

                <Link to="/forgot-password" className="nf-saas-forgot-link">Forgot Password?</Link>

                <button
                  type="submit" disabled={submitting || orgSuspended}
                  className="nf-saas-login-primary"
                >
                  <span>{submitting ? 'Signing In...' : 'Sign In'}</span>
                  {!submitting && <ArrowRight aria-hidden="true" />}
                </button>
              </form>

              {ssoEnabled && (
                <>
                  <div className="nf-saas-login-divider" role="separator"><span>Or Continue With</span></div>

                  <button
                    type="button"
                    onClick={() => { window.location.href = `${API_BASE}/api/auth/oauth/microsoft` }}
                    className="nf-saas-login-microsoft"
                  >
                    <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
                      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
                      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
                      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
                      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
                    </svg>
                    Continue with Microsoft
                  </button>
                </>
              )}

              <p className="nf-saas-login-mode-note">
                <Sparkles aria-hidden="true" />
                Continue building manually, with AI, or using both.
              </p>

              <p className="nf-saas-login-legal">
                By signing in, you agree to our Terms of Service and Privacy Policy.
              </p>

              <p className="nf-saas-login-help">
                Need help signing in? Contact your workspace administrator.
              </p>
            </>
          )}

          {step === 'mfa' && (
            <>
              <div className="nf-saas-login-step-icon"><KeyRound aria-hidden="true" /></div>
              <h1 className="nf-saas-login-heading">Two-factor authentication</h1>
              <p className="nf-saas-login-subtitle">
                Enter the 6-digit code from your authenticator app.
              </p>
              {mfaError && (
                <div className="nf-saas-login-alert nf-saas-login-alert-danger" role="alert">
                  <ShieldAlert aria-hidden="true" /><span>{mfaError}</span>
                </div>
              )}
              <form onSubmit={submitMfaVerify} className="nf-saas-login-form">
                <input
                  autoFocus inputMode="numeric" autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setMfaError('') }}
                  placeholder="Enter the 6-digit code"
                  className="nf-saas-login-code"
                />
                <button
                  type="submit" disabled={busy}
                  className="nf-saas-login-primary"
                >
                  {busy ? 'Verifying...' : 'Verify and sign in'}
                </button>
              </form>
              <button type="button" onClick={backToLogin} className="nf-saas-login-back">
                <ArrowLeft aria-hidden="true" /> Back to sign in
              </button>
            </>
          )}

          {step === 'setup' && (
            <>
              <h1 className="text-2xl font-bold text-fg">Set up two-factor auth</h1>
              <p className="text-sm text-fg-muted mt-1 mb-5">
                Admin accounts require an authenticator app. Scan this QR code with
                Google Authenticator (or Authy), then enter the 6-digit code.
              </p>
              {mfaError && (
                <div className="mb-4 p-3 rounded-lg bg-danger-subtle border border-danger-line text-danger-fg text-sm">
                  {mfaError}
                </div>
              )}
              {setupData?.qr ? (
                <div className="flex flex-col items-center">
                  <img src={setupData.qr} alt="MFA QR code" className="w-44 h-44 rounded-lg border border-line" />
                  <p className="mt-2 text-[11px] text-fg-subtle">
                    Can't scan? Enter this key manually:
                  </p>
                  <code className="text-xs font-mono text-fg-muted break-all text-center">{setupData.manualKey}</code>
                </div>
              ) : (
                <p className="text-sm text-fg-subtle">Loading QR code…</p>
              )}
              <form onSubmit={submitMfaEnable} className="space-y-4 mt-5">
                <input
                  inputMode="numeric" autoComplete="one-time-code"
                  value={code}
                  onChange={(e) => { setCode(e.target.value); setMfaError('') }}
                  placeholder="Enter 6-digit code"
                  className="w-full px-4 py-2.5 rounded-lg border border-line bg-surface text-fg placeholder:text-fg-subtle text-sm tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400 transition"
                />
                <button
                  type="submit" disabled={busy || !setupData}
                  className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white text-sm font-semibold shadow transition"
                >
                  {busy ? 'Verifying…' : 'Enable & continue'}
                </button>
              </form>
              <button onClick={backToLogin} className="mt-5 text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                ← Back to sign in
              </button>
            </>
          )}

          {step === 'backup' && (
            <>
              <h1 className="text-2xl font-bold text-fg">Save your backup codes</h1>
              <p className="text-sm text-fg-muted mt-1 mb-5">
                Store these one-time codes somewhere safe. Each can be used once if you
                lose access to your authenticator app.
              </p>
              <div className="grid grid-cols-2 gap-2 p-4 rounded-lg bg-surface-2 border border-line">
                {backupCodes.map((c) => (
                  <code key={c} className="text-sm font-mono text-fg text-center">{c}</code>
                ))}
              </div>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full mt-6 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow transition"
              >
                I've saved them — continue
              </button>
            </>
          )}
          </section>
        </div>
        <div className="nf-saas-login-security">
          <ShieldCheck aria-hidden="true" />
          <span>Your data is secure with us.</span>
        </div>
      </main>
    </div>
  )
}

export default Login
