import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '../../utils/auth';
import { getToken } from '../../utils/api';
import { toast } from '../../lib/toastStore';
import './business.css';
import {
  ArrowUpRight, Menu, ArrowRight, Play, Check, Lock, Waves, PanelsTopLeft, Inbox, FileText,
  Workflow, BarChart, CircleCheck, FileInput, GitBranch, UserCheck, Send,
  ClipboardList, ChevronDown, Sparkles, ShieldCheck, Route, History, MailWarning, Shuffle,
  Network, LayoutTemplate, Activity, Search, Type, ListFilter, Table2, Upload,
  PenLine, CalendarDays, MoreHorizontal, Split, Paperclip, BadgeCheck, CalendarRange, Radar,
  Gauge, KeyRound, Fingerprint, UsersRound, FolderLock, ScrollText, Users, MonitorCog,
  Landmark, ChevronRight, X
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

export default function BusinessLandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoSubmitted, setDemoSubmitted] = useState(false);
  const [platformTab, setPlatformTab] = useState('build');
  const [solutionTab, setSolutionTab] = useState('hr');
  const [isExiting, setIsExiting] = useState(false);
  const navigate = useNavigate();
  
  const user = useUser();
  const token = getToken();
  const isAuthenticated = Boolean(user && token);

  // If user is already logged in, seamlessly redirect them to their dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const revealRefs = useRef([]);
  revealRefs.current = [];
  
  const addToRevealRefs = (el) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealRefs.current.forEach((el) => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const handleSignInClick = (e) => {
    e.preventDefault();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      navigate('/login');
      return;
    }

    setIsExiting(true);
    setTimeout(() => {
      navigate('/login');
    }, 360);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    toast.info('Action coming soon.');
  };

  const solutionData = {
    hr: {
      label: "HR workflows",
      title: "Make every employee journey feel organized.",
      description: "Create clear, confidential workflows for onboarding, time off, performance reviews, expenses, and every step in between.",
      templates: ["Employee onboarding", "Leave requests", "Performance reviews", "Expense reimbursements"],
      flow: ["New hire form", "Route by department", "Onboarding complete"]
    },
    it: {
      label: "IT & operations",
      title: "Turn every service request into accountable action.",
      description: "Give employees one place to request access, equipment, incident support, and operational help—with ownership and deadlines built in.",
      templates: ["Hardware provisioning", "Software access", "Incident ticketing", "Facilities requests"],
      flow: ["Service request", "Assign by category", "Resolve & notify"]
    },
    finance: {
      label: "Finance workflows",
      title: "Keep spend controlled without slowing work down.",
      description: "Standardize purchasing, budgets, vendors, and exceptions with clear approval limits, supporting documents, and traceable decisions.",
      templates: ["Purchase orders", "Budget requests", "Vendor onboarding", "Invoice exceptions"],
      flow: ["Purchase request", "Apply approval limit", "Release order"]
    }
  };

  const chartData = [
    { name: 'W1', value: 84 }, { name: 'W2', value: 86 }, { name: 'W3', value: 85 },
    { name: 'W4', value: 88 }, { name: 'W5', value: 89 }, { name: 'W6', value: 88 },
    { name: 'W7', value: 91 }, { name: 'W8', value: 92 }, { name: 'W9', value: 91 },
    { name: 'W10', value: 94 }, { name: 'W11', value: 95 }, { name: 'W12', value: 96.4 }
  ];

  return (
    <div className={`bg-[#FBFCFC] font-['DM_Sans',sans-serif] text-[#091322] antialiased ${isExiting ? 'page-exit-active' : ''}`}>

      {/* Navigation */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-[#FBFCFC]/90 backdrop-blur-xl">
        <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Primary navigation">
          <Link to="/" className="flex items-center gap-2.5" aria-label="NetFlow home">
            <img src="/netflow-icon.png" alt="NetFlow" className="size-9 rounded-xl shadow-lg shadow-slate-950/15" />
            <span className="font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold tracking-[-0.05em]">NetFlow</span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            <a href="#platform" className="text-sm font-semibold text-slate-600 transition hover:text-[#091322]">Platform</a>
            <a href="#capabilities" className="text-sm font-semibold text-slate-600 transition hover:text-[#091322]">Capabilities</a>
            <a href="#solutions" className="text-sm font-semibold text-slate-600 transition hover:text-[#091322]">Solutions</a>
            <a href="#security" className="text-sm font-semibold text-slate-600 transition hover:text-[#091322]">Security</a>
            <a href="#resources" className="text-sm font-semibold text-slate-600 transition hover:text-[#091322]">Resources</a>
            <a href="/docs/" className="text-sm font-semibold text-slate-600 transition hover:text-primary">Documentation</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="/login" onClick={handleSignInClick} className="hidden rounded-xl px-4 py-2.5 text-sm font-bold text-slate-600 transition hover:bg-white hover:text-[#091322] md:inline-flex">Sign in</a>
            <button onClick={() => setIsModalOpen(true)} className="hidden items-center gap-2 rounded-xl bg-[#245A9A] cursor-pointer px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800 md:inline-flex">
              Book a demo <ArrowUpRight className="size-4" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="grid size-11 place-items-center rounded-xl border border-slate-200 bg-white text-[#091322] lg:hidden" aria-label="Open navigation" aria-expanded={isMobileMenuOpen}>
              <Menu className="size-5" />
            </button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-[#FBFCFC] px-4 pb-5 pt-3 lg:hidden">
            <div className="mx-auto grid max-w-7xl">
              <a href="#platform" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-200 py-3.5 font-semibold text-slate-700">Platform</a>
              <a href="#capabilities" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-200 py-3.5 font-semibold text-slate-700">Capabilities</a>
              <a href="#solutions" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-200 py-3.5 font-semibold text-slate-700">Solutions</a>
              <a href="#security" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-200 py-3.5 font-semibold text-slate-700">Security</a>
              <a href="#resources" onClick={() => setIsMobileMenuOpen(false)} className="border-b border-slate-200 py-3.5 font-semibold text-slate-700">Resources</a>
              <a href="/docs/" onClick={() => setIsMobileMenuOpen(false)} className="py-3.5 font-semibold text-primary">Documentation</a>
              <button onClick={() => setIsModalOpen(true)} className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-[#091322] px-5 py-3 text-sm font-bold text-white">Book a demo <ArrowRight className="size-4" /></button>
            </div>
          </div>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="hero-glow relative overflow-hidden border-b border-slate-200/80 pb-20 pt-8 sm:pt-12 lg:pb-20 lg:pt-8">
          <div className="pointer-events-none absolute left-1/2 top-12 -z-10 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-slate-200/50"></div>
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:gap-10 lg:px-8">
            <div className="relative z-10">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.14em] text-slate-600 shadow-sm backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#56DDB7] opacity-70"></span>
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500"></span>
                </span>
                AI-Powered Workflow Platform
              </div>

              <h1 className="max-w-3xl font-['Manrope','DM_Sans',sans-serif] text-[3.35rem] font-extrabold leading-[0.99] tracking-[-0.065em] text-[#091322] sm:text-7xl lg:text-[5.3rem]">
                Build every process your way Keep every step <span className="relative inline-block whitespace-nowrap"><span className="relative z-10">moving</span><span className="absolute bottom-1 left-0 z-0 h-[16%] w-full -rotate-1 rounded-full bg-[#C9F55D] sm:bottom-2"></span></span>
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8">
                Build processes manually, create faster with AI, automate routine steps, and track every request from start to finish—all in one secure workspace.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button onClick={() => setIsModalOpen(true)} className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/20 transition hover:-translate-y-0.5 hover:bg-indigo-600">
                  Book a demo
                  <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </button>
                <a href="#platform" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-[#091322] transition hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-lg">
                  <span className="grid size-6 place-items-center rounded-full bg-[#091322] text-white"><Play className="ml-0.5 size-3 fill-current" /></span>
                  Explore NetFlow
                </a>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500">
                <span className="flex items-center gap-1.5"><Check className="size-3.5 text-emerald-500" />Flexible by design</span>
                <span className="flex items-center gap-1.5"><Check className="size-3.5 text-emerald-500" />Secure by default</span>
                <span className="flex items-center gap-1.5"><Check className="size-3.5 text-emerald-500" />Built to scale</span>
              </div>
            </div>

            {/* Hero product composition */}
            <div className="relative mx-auto w-full max-w-[680px] lg:translate-x-8">
              <div className="absolute -inset-5 -z-10 rounded-[2.25rem] bg-gradient-to-br from-primary/20 via-transparent to-[#56DDB7]/20 blur-2xl"></div>
              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#091322] shadow-[0_32px_100px_rgba(9,19,34,0.18)] ring-1 ring-slate-950/5">
                <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
                  <div className="flex gap-1.5"><span className="size-2 rounded-full bg-white/20"></span><span className="size-2 rounded-full bg-white/20"></span><span className="size-2 rounded-full bg-white/20"></span></div>
                  <div className="flex items-center gap-2 text-[9px] font-semibold text-white/45"><Lock className="size-3" />app.netflow.io / workspace</div>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-[#56DDB7]"><span className="size-1.5 rounded-full bg-[#56DDB7] shadow-[0_0_0_4px_rgba(86,221,183,.12)]"></span>Live</div>
                </div>

                <div className="grid min-h-[510px] grid-cols-[64px_1fr] sm:grid-cols-[82px_1fr]">
                  <aside className="border-r border-white/10 bg-[#0d1829] px-2 py-4">
                    <div className="mb-5 grid place-items-center"><span className="grid size-8 place-items-center rounded-xl bg-white text-[#091322]"><Waves className="size-4" /></span></div>
                    <div className="space-y-2">
                      <span className="grid h-10 place-items-center rounded-xl bg-primary text-white"><PanelsTopLeft className="size-4" /></span>
                      <span className="grid h-10 place-items-center rounded-xl text-white/35"><Inbox className="size-4" /></span>
                      <span className="grid h-10 place-items-center rounded-xl text-white/35"><FileText className="size-4" /></span>
                      <span className="grid h-10 place-items-center rounded-xl text-white/35"><Workflow className="size-4" /></span>
                      <span className="grid h-10 place-items-center rounded-xl text-white/35"><BarChart className="size-4" /></span>
                    </div>
                  </aside>

                  <div className="relative overflow-hidden bg-[#101d30] p-3 sm:p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div>
                        <p className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.15em] text-white/35">Process canvas</p>
                        <h3 className="font-['Manrope','DM_Sans',sans-serif] text-xs font-bold text-white sm:text-sm">Purchase request approval</h3>
                      </div>
                      <div className="flex gap-1.5">
                        <button className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-[8px] font-bold text-white/60">Test run</button>
                        <button className="rounded-lg bg-[#C9F55D] px-2.5 py-1.5 text-[8px] font-extrabold text-[#091322]">Publish</button>
                      </div>
                    </div>

                    <div className="grid-paper relative h-[390px] overflow-hidden rounded-2xl border border-white/10 bg-[#f7f9fb]">
                      <div className="absolute inset-x-0 top-0 flex h-10 items-center justify-between border-b border-slate-200 bg-white/90 px-3">
                        <span className="text-[8px] font-bold text-slate-500">Workflow v6 · Auto-saved</span>
                        <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-600"><CircleCheck className="size-3" />Healthy</span>
                      </div>

                      <div className="absolute left-[4%] top-[92px] w-[88px] rounded-xl border border-indigo-200 bg-white p-2.5 shadow-md sm:w-[130px]">
                        <div className="mb-2 flex items-center gap-1.5 text-[7px] font-extrabold uppercase tracking-wide text-indigo-600"><span className="grid size-5 place-items-center rounded-md bg-indigo-50"><FileInput className="size-2.5" /></span>Trigger</div>
                        <strong className="block text-[9px] leading-tight text-[#091322] sm:text-[10px]">Form submitted</strong>
                        <small className="mt-1 block text-[7px] leading-tight text-slate-400">Purchase request · v4</small>
                      </div>

                      <div className="absolute left-[38%] top-[92px] w-[88px] rounded-xl border border-amber-200 bg-white p-2.5 shadow-md sm:w-[130px]">
                        <div className="mb-2 flex items-center gap-1.5 text-[7px] font-extrabold uppercase tracking-wide text-amber-600"><span className="grid size-5 place-items-center rounded-md bg-amber-50"><GitBranch className="size-2.5" /></span>Condition</div>
                        <strong className="block text-[9px] leading-tight text-[#091322] sm:text-[10px]">Value over ₹5L?</strong>
                        <small className="mt-1 block text-[7px] leading-tight text-slate-400">Evaluate submitted total</small>
                      </div>

                      <div className="absolute right-[3%] top-[62px] w-[88px] rounded-xl border border-violet-200 bg-white p-2.5 shadow-md sm:w-[130px]">
                        <div className="mb-2 flex items-center gap-1.5 text-[7px] font-extrabold uppercase tracking-wide text-violet-600"><span className="grid size-5 place-items-center rounded-md bg-violet-50"><UserCheck className="size-2.5" /></span>Approval</div>
                        <strong className="block text-[9px] leading-tight text-[#091322] sm:text-[10px]">Finance Director</strong>
                        <small className="mt-1 block text-[7px] leading-tight text-slate-400">2 day decision SLA</small>
                      </div>

                      <div className="absolute right-[3%] top-[170px] w-[88px] rounded-xl border border-emerald-200 bg-white p-2.5 shadow-md sm:w-[130px]">
                        <div className="mb-2 flex items-center gap-1.5 text-[7px] font-extrabold uppercase tracking-wide text-emerald-600"><span className="grid size-5 place-items-center rounded-md bg-emerald-50"><Send className="size-2.5" /></span>Action</div>
                        <strong className="block text-[9px] leading-tight text-[#091322] sm:text-[10px]">Notify manager</strong>
                        <small className="mt-1 block text-[7px] leading-tight text-slate-400">Email + push update</small>
                      </div>

                      <svg className="pointer-events-none absolute left-0 top-10 h-[220px] w-full" viewBox="0 0 540 220" fill="none" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M128 92 C170 92 178 92 205 92" stroke="#a6b1c0" strokeWidth="2" strokeDasharray="5 5"/>
                        <path d="M335 92 C375 92 365 54 408 54" stroke="var(--color-primary)" strokeWidth="2"/>
                        <path d="M335 92 C375 92 365 166 408 166" stroke="var(--color-primary)" strokeWidth="2"/>
                        <circle cx="128" cy="92" r="3.5" fill="var(--color-primary)"/>
                        <circle cx="335" cy="92" r="3.5" fill="var(--color-primary)"/>
                      </svg>

                      <div className="absolute bottom-3 left-3 right-3 grid grid-cols-3 gap-2 rounded-xl border border-slate-200 bg-white/95 p-2.5 shadow-lg backdrop-blur">
                        <div><span className="text-[6px] font-extrabold uppercase tracking-wider text-slate-400">Active</span><strong className="mt-0.5 block text-xs font-extrabold text-[#091322]">184</strong></div>
                        <div className="border-l border-slate-100 pl-2"><span className="text-[6px] font-extrabold uppercase tracking-wider text-slate-400">On SLA</span><strong className="mt-0.5 block text-xs font-extrabold text-emerald-600">96%</strong></div>
                        <div className="border-l border-slate-100 pl-2"><span className="text-[6px] font-extrabold uppercase tracking-wider text-slate-400">Median</span><strong className="mt-0.5 block text-xs font-extrabold text-[#091322]">2.8d</strong></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating live form */}
              <div className="absolute -bottom-9 -left-3 hidden w-[240px] animate-float-soft overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(9,19,34,0.16)] sm:block lg:-left-14">
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <span className="flex items-center gap-2 text-[9px] font-extrabold"><span className="grid size-6 place-items-center rounded-lg bg-indigo-50 text-primary"><ClipboardList className="size-3" /></span>Purchase request</span>
                  <span className="rounded-md bg-emerald-50 px-1.5 py-0.5 text-[7px] font-extrabold text-emerald-600">LIVE</span>
                </div>
                <div className="space-y-2.5 p-4">
                  <div><span className="mb-1 block text-[7px] font-bold text-slate-500">Item category</span><div className="flex h-7 items-center justify-between rounded-md border border-slate-200 px-2 text-[7px] text-slate-500">Software <ChevronDown className="size-2.5" /></div></div>
                  <div><span className="mb-1 block text-[7px] font-bold text-slate-500">Estimated value</span><div className="flex h-7 items-center rounded-md border border-slate-200 px-2 text-[7px] text-slate-500">₹ 6,75,000</div></div>
                  <div className="rounded-lg border border-indigo-100 bg-indigo-50/70 p-2 text-[7px] font-bold text-indigo-600"><Sparkles className="mr-1 inline size-2.5" />Executive approval added automatically</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-7xl px-4 sm:px-6 lg:mt-28 lg:px-8">
            <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:grid-cols-3">
              <div className="flex items-center gap-3 rounded-xl px-4 py-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-600"><ShieldCheck className="size-4" /></span><div><strong className="block text-xs">Secure workspaces</strong><span className="text-[10px] text-slate-500">Company data stays protected</span></div></div>
              <div className="flex items-center gap-3 rounded-xl border-y border-slate-100 px-4 py-3 sm:border-x sm:border-y-0"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-indigo-50 text-primary"><Route className="size-4" /></span><div><strong className="block text-xs">Manual or AI-assisted</strong><span className="text-[10px] text-slate-500">Build your way from day one</span></div></div>
              <div className="flex items-center gap-3 rounded-xl px-4 py-3"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-amber-50 text-amber-600"><History className="size-4" /></span><div><strong className="block text-xs">Complete activity history</strong><span className="text-[10px] text-slate-500">Every decision stays traceable</span></div></div>
            </div>
          </div>
        </section>

        {/* Problem / outcome */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-start gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
              <div className="reveal lg:sticky lg:top-32" ref={addToRevealRefs}>
                <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-px w-6 bg-primary"></span>When work lives everywhere</span>
                <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">Your process deserves more than a spreadsheet.</h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">Spreadsheets store information, but they cannot manage the decisions, owners, documents, and deadlines around it. NetFlow turns that scattered work into a process everyone can follow.</p>
              </div>

              <div className="grid gap-4">
                <article className="reveal group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_70px_rgba(9,19,34,0.10)] sm:p-8" ref={addToRevealRefs}>
                  <div className="flex items-start gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-rose-50 text-rose-500"><MailWarning className="size-5" /></span>
                    <div><span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-rose-500">Before NetFlow</span><h3 className="mt-2 font-['Manrope','DM_Sans',sans-serif] text-xl font-bold tracking-tight sm:text-2xl">Requests lose their context.</h3><p className="mt-2 text-sm leading-6 text-slate-500">Details get buried across inboxes, files, and follow-ups, making every handoff slower.</p></div>
                  </div>
                </article>
                <article className="reveal group rounded-3xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_20px_70px_rgba(9,19,34,0.10)] sm:p-8" ref={addToRevealRefs}>
                  <div className="flex items-start gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600"><Shuffle className="size-5" /></span>
                    <div><span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-amber-600">Before NetFlow</span><h3 className="mt-2 font-['Manrope','DM_Sans',sans-serif] text-xl font-bold tracking-tight sm:text-2xl">Exceptions create more manual work.</h3><p className="mt-2 text-sm leading-6 text-slate-500">Approval limits, department rules, and special cases depend on memory instead of a repeatable process.</p></div>
                  </div>
                </article>
                <article className="reveal group rounded-3xl border border-emerald-200 bg-emerald-50/50 p-6 transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(9,19,34,0.10)] sm:p-8" ref={addToRevealRefs}>
                  <div className="flex items-start gap-5">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-[#091322] text-[#C9F55D]"><Network className="size-5" /></span>
                    <div><span className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-emerald-700">With NetFlow</span><h3 className="mt-2 font-['Manrope','DM_Sans',sans-serif] text-xl font-bold tracking-tight sm:text-2xl">Every process becomes clear and connected.</h3><p className="mt-2 text-sm leading-6 text-slate-600">Start with a form or a standalone workflow, assign ownership, and keep every step visible from request to outcome.</p></div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Connected platform interactive tabs */}
        <section id="platform" className="relative overflow-hidden bg-[#091322] py-20 text-white sm:py-28">
          <div className="grid-dark absolute inset-0 opacity-60"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[0.76fr_1.24fr] lg:items-end">
              <div>
                <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#56DDB7]"><span className="h-px w-6 bg-[#56DDB7]"></span>Manual control • AI assistance</span>
                <h2 className="max-w-2xl font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">Start manually. Start with AI. Stay in control.</h2>
              </div>
              <p className="max-w-xl text-base leading-7 text-slate-400 lg:justify-self-end">Create forms and workflows from scratch, or let AI generate a structured first draft. Then add approvals, rules, deadlines, documents, and notifications exactly where you need them.</p>
            </div>

            <div className="mt-12 overflow-x-auto pb-2 scrollbar-hide">
              <div className="inline-flex min-w-full gap-2 rounded-2xl border border-white/10 bg-white/[0.04] p-1.5 sm:min-w-0">
                <button onClick={() => setPlatformTab('build')} className={`flex min-w-[170px] flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left transition ${platformTab === 'build' ? 'bg-white text-[#091322] shadow-lg' : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'}`}>
                  <span className={`grid size-8 place-items-center rounded-lg ${platformTab === 'build' ? 'bg-indigo-50 text-primary' : 'bg-white/10 text-white'}`}><LayoutTemplate className="size-4" /></span>
                  <span><small className={`block text-[8px] font-extrabold uppercase tracking-wider ${platformTab === 'build' ? 'text-slate-400' : 'text-white/30'}`}>01</small><strong className="text-xs">Design forms</strong></span>
                </button>
                <button onClick={() => setPlatformTab('route')} className={`flex min-w-[170px] flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left transition ${platformTab === 'route' ? 'bg-white text-[#091322] shadow-lg' : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'}`}>
                  <span className={`grid size-8 place-items-center rounded-lg ${platformTab === 'route' ? 'bg-indigo-50 text-primary' : 'bg-white/10 text-white'}`}><Workflow className="size-4" /></span>
                  <span><small className={`block text-[8px] font-extrabold uppercase tracking-wider ${platformTab === 'route' ? 'text-slate-400' : 'text-white/30'}`}>02</small><strong className="text-xs">Build workflows</strong></span>
                </button>
                <button onClick={() => setPlatformTab('measure')} className={`flex min-w-[170px] flex-1 items-center gap-3 rounded-xl px-4 py-3 text-left transition ${platformTab === 'measure' ? 'bg-white text-[#091322] shadow-lg' : 'bg-transparent text-white/60 hover:bg-white/5 hover:text-white'}`}>
                  <span className={`grid size-8 place-items-center rounded-lg ${platformTab === 'measure' ? 'bg-indigo-50 text-primary' : 'bg-white/10 text-white'}`}><Activity className="size-4" /></span>
                  <span><small className={`block text-[8px] font-extrabold uppercase tracking-wider ${platformTab === 'measure' ? 'text-slate-400' : 'text-white/30'}`}>03</small><strong className="text-xs">Track performance</strong></span>
                </button>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#101d30] shadow-2xl">
              {/* Build view */}
              <div className={platformTab === 'build' ? 'grid min-h-[600px] lg:grid-cols-[220px_1fr_260px]' : 'hidden'}>
                <aside className="hidden border-r border-white/10 bg-[#0d1829] p-4 lg:block">
                  <div className="mb-5 flex items-center justify-between"><span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Form fields</span><Search className="size-3.5 text-white/30" /></div>
                  <div className="space-y-2">
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-white/60"><Type className="size-3.5" />Short text</div>
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-white/60"><ListFilter className="size-3.5" />Dropdown</div>
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-white/60"><Table2 className="size-3.5" />Data grid</div>
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-[#56DDB7]/20 bg-[#56DDB7]/10 px-3 text-[10px] font-semibold text-[#56DDB7]"><Upload className="size-3.5" />File upload</div>
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-white/60"><PenLine className="size-3.5" />Signature</div>
                    <div className="flex h-10 items-center gap-2.5 rounded-xl border border-white/10 bg-white/5 px-3 text-[10px] font-semibold text-white/60"><CalendarDays className="size-3.5" />Date</div>
                  </div>
                </aside>

                <div className="grid-paper bg-[#F3F6F7] p-4 sm:p-8">
                  <div className="mx-auto max-w-[540px] rounded-2xl border border-slate-200 bg-white p-5 shadow-xl sm:p-7">
                    <div className="mb-6 flex items-start justify-between">
                      <div><span className="mb-2 inline-flex rounded-md bg-indigo-50 px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-primary">Page 2 of 3</span><h3 className="font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold tracking-tight text-[#091322]">Business travel request</h3><p className="mt-1 text-[10px] text-slate-500">Add trip details and expected cost.</p></div>
                      <button className="grid size-8 place-items-center rounded-lg border border-slate-200 text-slate-400"><MoreHorizontal className="size-4" /></button>
                    </div>
                    <div className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <label className="block text-[9px] font-bold text-slate-600">Destination<div className="mt-1.5 flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-[10px] font-medium text-slate-500">Mumbai, India</div></label>
                        <label className="block text-[9px] font-bold text-slate-600">Estimated total<div className="mt-1.5 flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-[10px] font-medium text-slate-500">₹ 68,000</div></label>
                      </div>
                      <label className="block text-[9px] font-bold text-slate-600">Business purpose<div className="mt-1.5 flex min-h-16 items-start rounded-lg border border-slate-200 bg-slate-50 p-3 text-[10px] font-medium text-slate-500">Client implementation workshop and project kickoff.</div></label>
                      <div className="rounded-xl border border-indigo-200 bg-indigo-50/60 p-4">
                        <div className="mb-3 flex items-center justify-between text-[8px] font-extrabold uppercase tracking-wider text-indigo-600"><span className="flex items-center gap-1.5"><Split className="size-3" />Conditional section</span><span>Travel = Yes</span></div>
                        <div className="rounded-lg border border-indigo-100 bg-white px-3 py-2.5 text-[9px] text-slate-500"><Paperclip className="mr-1.5 inline size-3" />Upload quotation or itinerary</div>
                      </div>
                    </div>
                    <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4"><span className="text-[8px] font-bold text-slate-400">6 required fields completed</span><button className="rounded-lg bg-primary px-4 py-2 text-[9px] font-extrabold text-white">Save & continue</button></div>
                  </div>
                </div>

                <aside className="hidden border-l border-white/10 bg-[#0d1829] p-4 lg:block">
                  <span className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/40">Field settings</span>
                  <div className="mt-5 space-y-4">
                    <div><span className="mb-1.5 block text-[8px] font-bold text-white/40">LABEL</span><div className="flex h-9 items-center rounded-lg border border-white/10 bg-white/5 px-3 text-[9px] text-white/70">Travel documents</div></div>
                    <div><span className="mb-1.5 block text-[8px] font-bold text-white/40">ALLOWED FILES</span><div className="flex h-9 items-center justify-between rounded-lg border border-white/10 bg-white/5 px-3 text-[9px] text-white/70">PDF, JPG, PNG <ChevronDown className="size-3" /></div></div>
                    <div className="flex items-center justify-between border-t border-white/10 pt-4"><span className="text-[9px] font-semibold text-white/60">Required field</span><span className="flex h-5 w-9 items-center justify-end rounded-full bg-primary p-0.5"><span className="size-4 rounded-full bg-white"></span></span></div>
                    <div className="rounded-xl border border-[#56DDB7]/20 bg-[#56DDB7]/10 p-3 text-[8px] leading-5 text-[#56DDB7]"><strong className="block">Smart logic active</strong>Visible only when travel is required.</div>
                  </div>
                </aside>
              </div>

              {/* Route view */}
              <div className={platformTab === 'route' ? 'min-h-[600px]' : 'hidden'}>
                <div className="flex h-14 items-center justify-between border-b border-white/10 px-4 sm:px-6">
                  <div><span className="text-[8px] font-extrabold uppercase tracking-wider text-white/30">Workflow canvas</span><strong className="ml-2 text-xs text-white">Travel approval · v7</strong></div>
                  <div className="flex items-center gap-2"><span className="hidden text-[8px] font-bold text-white/30 sm:inline">Last saved now</span><button className="rounded-lg bg-[#C9F55D] px-3 py-2 text-[9px] font-extrabold text-[#091322]">Publish changes</button></div>
                </div>
                <div className="grid-paper relative h-[546px] overflow-hidden bg-[#f7f9fb]">
                  <div className="flow-port no-left-port absolute left-[4%] top-[205px] w-[105px] rounded-2xl border border-indigo-200 bg-white p-3 shadow-lg sm:w-[150px] sm:p-4">
                    <span className="mb-3 grid size-8 place-items-center rounded-lg bg-indigo-50 text-primary"><FileInput className="size-4" /></span><strong className="block text-xs text-[#091322]">Travel form submitted</strong><small className="mt-1 block text-[8px] text-slate-400">Starts this workflow</small>
                  </div>
                  <div className="flow-port absolute left-[35%] top-[205px] w-[105px] rounded-2xl border border-amber-200 bg-white p-3 shadow-lg sm:w-[150px] sm:p-4">
                    <span className="mb-3 grid size-8 place-items-center rounded-lg bg-amber-50 text-amber-600"><GitBranch className="size-4" /></span><strong className="block text-xs text-[#091322]">Cost above ₹50K?</strong><small className="mt-1 block text-[8px] text-slate-400">Split by submitted value</small>
                  </div>
                  <div className="flow-port absolute right-[5%] top-[100px] w-[105px] rounded-2xl border border-violet-200 bg-white p-3 shadow-lg sm:w-[150px] sm:p-4">
                    <span className="mb-3 grid size-8 place-items-center rounded-lg bg-violet-50 text-violet-600"><UserCheck className="size-4" /></span><strong className="block text-xs text-[#091322]">Finance approval</strong><small className="mt-1 block text-[8px] text-slate-400">2 day decision SLA</small>
                  </div>
                  <div className="flow-port absolute right-[5%] top-[310px] w-[105px] rounded-2xl border border-emerald-200 bg-white p-3 shadow-lg sm:w-[150px] sm:p-4">
                    <span className="mb-3 grid size-8 place-items-center rounded-lg bg-emerald-50 text-emerald-600"><BadgeCheck className="size-4" /></span><strong className="block text-xs text-[#091322]">Manager approval</strong><small className="mt-1 block text-[8px] text-slate-400">1 day decision SLA</small>
                  </div>
                  <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1000 546" preserveAspectRatio="none" fill="none">
                    <path d="M190 255 C260 255 275 255 350 255" stroke="#9ba7b8" strokeWidth="2" strokeDasharray="7 7"/>
                    <path d="M500 255 C610 255 650 155 800 155" stroke="var(--color-primary)" strokeWidth="2"/>
                    <path d="M500 255 C610 255 650 365 800 365" stroke="var(--color-primary)" strokeWidth="2"/>
                    <circle cx="190" cy="255" r="5" fill="var(--color-primary)"/><circle cx="500" cy="255" r="5" fill="var(--color-primary)"/>
                  </svg>
                  <span className="absolute left-[64%] top-[156px] rounded-md border border-slate-200 bg-white px-2 py-1 text-[7px] font-extrabold text-emerald-600 shadow-sm">YES</span>
                  <span className="absolute left-[64%] top-[349px] rounded-md border border-slate-200 bg-white px-2 py-1 text-[7px] font-extrabold text-slate-500 shadow-sm">NO</span>
                </div>
              </div>

              {/* Measure view */}
              <div className={platformTab === 'measure' ? 'min-h-[600px] bg-[#F3F6F7] p-4 text-[#091322] sm:p-8' : 'hidden'}>
                <div className="mx-auto max-w-5xl">
                  <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">Workspace analytics</span><h3 className="mt-1 font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold">Operational performance</h3></div><button className="flex items-center gap-2 self-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-[9px] font-bold text-slate-600"><CalendarRange className="size-3.5" />Last 30 days</button></div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5"><span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">On-time completion</span><div className="mt-3 flex items-end justify-between"><strong className="font-['Manrope','DM_Sans',sans-serif] text-3xl font-extrabold">96.4%</strong><span className="text-[9px] font-bold text-emerald-600">+4.8%</span></div></div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5"><span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">Median cycle time</span><div className="mt-3 flex items-end justify-between"><strong className="font-['Manrope','DM_Sans',sans-serif] text-3xl font-extrabold">2.8d</strong><span className="text-[9px] font-bold text-emerald-600">-0.6d</span></div></div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5"><span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-400">Requests processed</span><div className="mt-3 flex items-end justify-between"><strong className="font-['Manrope','DM_Sans',sans-serif] text-3xl font-extrabold">1,284</strong><span className="text-[9px] font-bold text-primary">This month</span></div></div>
                  </div>
                  <div className="mt-3 grid gap-3 lg:grid-cols-[1fr_280px]">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5">
                      <div className="mb-6 flex items-center justify-between"><strong className="text-xs">Cycle time trend</strong><span className="text-[8px] text-slate-400">Days</span></div>
                      <div className="chart-wrap flex h-48 items-end gap-2">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorSla" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.28}/>
                                <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2.5} fillOpacity={1} fill="url(#colorSla)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div className="rounded-2xl bg-[#091322] p-5 text-white"><span className="text-[8px] font-extrabold uppercase tracking-wider text-white/40">Attention needed</span><strong className="mt-4 block font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold text-[#C9F55D]">07</strong><p className="mt-2 text-[10px] leading-5 text-white/50">Active requests are at risk of missing an SLA.</p><button className="mt-8 flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2.5 text-[9px] font-bold">View at-risk work <ArrowRight className="size-3.5" /></button></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section id="capabilities" className="bg-[#F3F6F7] py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center reveal" ref={addToRevealRefs}>
              <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-px w-6 bg-primary"></span>Everything your process needs<span className="h-px w-6 bg-primary"></span></span>
              <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">Easy to start. Powerful enough to scale.</h2>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600">From flexible forms and AI-assisted building to secure approvals and reporting, NetFlow gives every team the tools to create dependable processes.</p>
            </div>

            <div className="mt-12 grid auto-rows-[minmax(280px,auto)] gap-4 md:grid-cols-2 lg:grid-cols-12">
              <article className="reveal group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_20px_70px_rgba(9,19,34,0.10)] lg:col-span-7 lg:row-span-2" ref={addToRevealRefs}>
                <div className="relative z-10 max-w-md">
                  <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-indigo-50 text-primary"><Sparkles className="size-5" /></span>
                  <h3 className="font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold tracking-tight">Forms and workflows, built your way.</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">Start from scratch or use AI to create a structured draft. Then customize fields, steps, files, signatures, and logic without writing code.</p>
                </div>
                <div className="absolute -bottom-8 -right-10 w-[72%] rotate-[-2deg] rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-2xl transition duration-500 group-hover:-translate-y-2 group-hover:rotate-0 sm:w-[58%]">
                  <div className="mb-4 flex items-center justify-between"><span className="h-2 w-24 rounded bg-slate-700"></span><span className="rounded-md bg-indigo-100 px-2 py-1 text-[6px] font-extrabold text-indigo-600">PAGE 1 / 3</span></div>
                  <div className="space-y-3"><div><span className="mb-1 block h-1 w-14 rounded bg-slate-300"></span><span className="block h-8 rounded-lg border border-slate-200 bg-white"></span></div><div className="grid grid-cols-2 gap-2"><div><span className="mb-1 block h-1 w-10 rounded bg-slate-300"></span><span className="block h-8 rounded-lg border border-slate-200 bg-white"></span></div><div><span className="mb-1 block h-1 w-12 rounded bg-slate-300"></span><span className="block h-8 rounded-lg border border-slate-200 bg-white"></span></div></div><div className="rounded-lg border border-indigo-100 bg-indigo-50 p-2 text-[6px] font-bold text-indigo-600">IF department = Finance, show cost center</div></div>
                </div>
              </article>

              <article className="reveal relative overflow-hidden rounded-3xl bg-primary p-7 text-white lg:col-span-5" ref={addToRevealRefs}>
                <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-white/15"><GitBranch className="size-5" /></span>
                <h3 className="font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold tracking-tight">Conditional routing</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-indigo-100">Send work to the right person or team using request details, roles, and business rules.</p>
                <div className="absolute -bottom-5 right-5 flex items-center gap-2">
                  <span className="grid size-11 place-items-center rounded-xl bg-white text-primary shadow-xl"><FileInput className="size-4" /></span><span className="h-px w-8 bg-white/40"></span><span className="grid size-11 place-items-center rounded-xl bg-[#C9F55D] text-[#091322] shadow-xl"><GitBranch className="size-4" /></span><span className="h-px w-8 bg-white/40"></span><span className="grid size-11 place-items-center rounded-xl bg-white text-emerald-600 shadow-xl"><BadgeCheck className="size-4" /></span>
                </div>
              </article>

              <article className="reveal relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 lg:col-span-5" ref={addToRevealRefs}>
                <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><Gauge className="size-5" /></span>
                <h3 className="font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold tracking-tight">SLA monitoring</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">Track deadlines, notify owners, and escalate work before a service commitment is missed.</p>
                <div className="absolute bottom-6 right-7 grid size-24 place-items-center rounded-full bg-[conic-gradient(#56DDB7_0_86%,#E8EDF1_86%)]">
                  <span className="grid size-20 place-items-center rounded-full bg-white text-center"><span><strong className="block font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold">96%</strong><small className="text-[6px] font-extrabold uppercase tracking-wider text-slate-400">On time</small></span></span>
                </div>
              </article>

              <article className="reveal relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 lg:col-span-4" ref={addToRevealRefs}>
                <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-violet-50 text-violet-600"><UsersRound className="size-5" /></span>
                <h3 className="font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold tracking-tight">Role-based access</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">Control access by workspace, role, department, and record ownership.</p>
                <div className="mt-8 flex -space-x-2"><span className="grid size-9 place-items-center rounded-full border-2 border-white bg-indigo-500 text-[8px] font-extrabold text-white">AD</span><span className="grid size-9 place-items-center rounded-full border-2 border-white bg-emerald-500 text-[8px] font-extrabold text-white">VP</span><span className="grid size-9 place-items-center rounded-full border-2 border-white bg-amber-500 text-[8px] font-extrabold text-white">HR</span><span className="grid size-9 place-items-center rounded-full border-2 border-white bg-slate-200 text-[8px] font-extrabold text-slate-600">+8</span></div>
              </article>

              <article className="reveal relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-7 lg:col-span-4" ref={addToRevealRefs}>
                <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-amber-50 text-amber-600"><FolderLock className="size-5" /></span>
                <h3 className="font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold tracking-tight">Secure document management</h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">Keep files, previews, and signatures connected to the right request.</p>
                <div className="mt-7 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 p-3"><span className="grid size-8 place-items-center rounded-lg bg-rose-50 text-[7px] font-extrabold text-rose-500">PDF</span><span><strong className="block text-[8px]">vendor-agreement.pdf</strong><small className="text-[7px] text-slate-400">2.4 MB · Verified</small></span></div>
              </article>

              <article className="reveal relative overflow-hidden rounded-3xl bg-[#091322] p-7 text-white lg:col-span-4" ref={addToRevealRefs}>
                <span className="mb-6 grid size-11 place-items-center rounded-2xl bg-white/10 text-[#C9F55D]"><ScrollText className="size-5" /></span>
                <h3 className="font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold tracking-tight">Complete activity history</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">Keep important edits, approvals, rejections, and access changes traceable.</p>
                <div className="mt-7 space-y-2"><div className="flex items-center justify-between border-b border-white/10 pb-2 text-[8px]"><span className="flex items-center gap-2"><CircleCheck className="size-3 text-[#56DDB7]" />Request approved</span><span className="text-white/30">10:42</span></div><div className="flex items-center justify-between text-[8px]"><span className="flex items-center gap-2"><CircleCheck className="size-3 text-[#56DDB7]" />Role permission changed</span><span className="text-white/30">09:18</span></div></div>
              </article>
            </div>
          </div>
        </section>

        {/* Solutions */}
        <section id="solutions" className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.76fr_1.24fr]">
              <div className="reveal" ref={addToRevealRefs}>
                <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-px w-6 bg-primary"></span>Built for every team</span>
                <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">One platform for the work every team runs.</h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">Use a proven template, build manually, or start with AI—then adapt every field, owner, rule, and deadline to the way your organization works.</p>

                <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-hide lg:grid">
                  <button onClick={() => setSolutionTab('hr')} className={`flex min-w-[190px] items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${solutionTab === 'hr' ? 'bg-[#091322] border-[#091322] text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                    <span className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-xl ${solutionTab === 'hr' ? 'bg-white/10 text-[#C9F55D]' : 'bg-[#C9F55D]/20 text-[#091322]'}`}><Users className="size-4" /></span><span><strong className="block text-sm">Human Resources</strong><small className={`text-[9px] ${solutionTab === 'hr' ? 'text-white/45' : 'text-slate-400'}`}>People operations</small></span></span><ArrowRight className="size-4" />
                  </button>
                  <button onClick={() => setSolutionTab('it')} className={`flex min-w-[190px] items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${solutionTab === 'it' ? 'bg-[#091322] border-[#091322] text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                    <span className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-xl ${solutionTab === 'it' ? 'bg-white/10 text-[#C9F55D]' : 'bg-emerald-50 text-emerald-600'}`}><MonitorCog className="size-4" /></span><span><strong className="block text-sm">IT & Operations</strong><small className={`text-[9px] ${solutionTab === 'it' ? 'text-white/45' : 'text-slate-400'}`}>Service delivery</small></span></span><ArrowRight className="size-4" />
                  </button>
                  <button onClick={() => setSolutionTab('finance')} className={`flex min-w-[190px] items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition ${solutionTab === 'finance' ? 'bg-[#091322] border-[#091322] text-white' : 'bg-white border-slate-200 text-slate-600'}`}>
                    <span className="flex items-center gap-3"><span className={`grid size-9 place-items-center rounded-xl ${solutionTab === 'finance' ? 'bg-white/10 text-[#C9F55D]' : 'bg-amber-50 text-amber-600'}`}><Landmark className="size-4" /></span><span><strong className="block text-sm">Finance</strong><small className={`text-[9px] ${solutionTab === 'finance' ? 'text-white/45' : 'text-slate-400'}`}>Spend control</small></span></span><ArrowRight className="size-4" />
                  </button>
                </div>
              </div>

              <div className="reveal relative min-h-[570px] overflow-hidden rounded-[2rem] bg-[#091322] p-6 text-white shadow-[0_32px_100px_rgba(9,19,34,0.18)] sm:p-9" ref={addToRevealRefs}>
                <div className="absolute -right-32 -top-32 size-[380px] rounded-full bg-primary/20 blur-2xl"></div>
                <div className="relative z-10 max-w-xl">
                  <span className="inline-flex rounded-md border border-[#56DDB7]/20 bg-[#56DDB7]/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-[#56DDB7]">{solutionData[solutionTab].label}</span>
                  <h3 className="mt-5 font-['Manrope','DM_Sans',sans-serif] text-3xl font-extrabold leading-tight tracking-[-0.04em] sm:text-4xl">{solutionData[solutionTab].title}</h3>
                  <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">{solutionData[solutionTab].description}</p>
                  <div className="mt-7 grid gap-2 sm:grid-cols-2">
                    {solutionData[solutionTab].templates.map(t => (
                      <span key={t} className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-[10px] font-semibold"><Check className="size-3.5 text-[#56DDB7]" />{t}</span>
                    ))}
                  </div>
                </div>

                <div className="absolute bottom-7 left-6 right-6 z-10 rounded-2xl border border-white/10 bg-[#14243a] p-4 sm:left-9 sm:right-9">
                  <div className="flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 p-3"><span className="mb-2 grid size-6 place-items-center rounded-lg bg-indigo-500/20 text-indigo-300"><FileInput className="size-3" /></span><strong className="block truncate text-[9px]">{solutionData[solutionTab].flow[0]}</strong><small className="text-[7px] text-white/35">Request received</small></div>
                    <ChevronRight className="size-4 shrink-0 text-white/25" />
                    <div className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 p-3"><span className="mb-2 grid size-6 place-items-center rounded-lg bg-amber-500/20 text-amber-300"><Route className="size-3" /></span><strong className="block truncate text-[9px]">{solutionData[solutionTab].flow[1]}</strong><small className="text-[7px] text-white/35">Owners assigned</small></div>
                    <ChevronRight className="size-4 shrink-0 text-white/25" />
                    <div className="min-w-0 flex-1 rounded-xl border border-[#56DDB7]/20 bg-[#56DDB7]/10 p-3"><span className="mb-2 grid size-6 place-items-center rounded-lg bg-[#56DDB7]/20 text-[#56DDB7]"><BadgeCheck className="size-3" /></span><strong className="block truncate text-[9px]">{solutionData[solutionTab].flow[2]}</strong><small className="text-[7px] text-white/35">Record archived</small></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section id="analytics" className="border-y border-slate-200 bg-white py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <div className="reveal" ref={addToRevealRefs}>
                <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-px w-6 bg-primary"></span>Workflow intelligence</span>
                <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">See where work slows down—before deadlines slip.</h2>
                <p className="mt-6 max-w-lg text-base leading-7 text-slate-600">Track active requests, completion times, approval rates, bottlenecks, and SLA risk from one live view.</p>
                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-[#F3F6F7] p-4"><Radar className="size-4 text-primary" /><strong className="mt-3 block text-sm">Early risk signals</strong><p className="mt-1 text-xs leading-5 text-slate-500">Focus on requests most likely to miss a deadline.</p></div>
                  <div className="rounded-2xl border border-slate-200 bg-[#F3F6F7] p-4"><Gauge className="size-4 text-emerald-600" /><strong className="mt-3 block text-sm">Team and process benchmarks</strong><p className="mt-1 text-xs leading-5 text-slate-500">Compare turnaround times across workflows and teams.</p></div>
                </div>
              </div>

              <div className="reveal overflow-hidden rounded-[1.75rem] border border-slate-200 bg-[#F3F6F7] p-4 shadow-[0_20px_70px_rgba(9,19,34,0.10)] sm:p-6" ref={addToRevealRefs}>
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex items-center justify-between"><div><span className="text-[8px] font-extrabold uppercase tracking-[0.14em] text-slate-400">SLA performance</span><h3 className="mt-1 font-['Manrope','DM_Sans',sans-serif] text-lg font-extrabold">Completion trend</h3></div><span className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-[8px] font-bold text-slate-500"><CalendarDays className="size-3" />12 weeks</span></div>
                  <div className="chart-wrap mt-6 h-64">
                    <img src="/sla-completion-trend.png" alt="SLA Completion Trend" className="h-full w-full object-cover rounded-xl" />
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-white p-3"><span className="text-[7px] font-extrabold uppercase tracking-wider text-slate-400">On time</span><strong className="mt-1 block text-lg font-extrabold">96.4%</strong></div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3"><span className="text-[7px] font-extrabold uppercase tracking-wider text-slate-400">At risk</span><strong className="mt-1 block text-lg font-extrabold text-amber-500">07</strong></div>
                  <div className="rounded-xl border border-slate-200 bg-white p-3"><span className="text-[7px] font-extrabold uppercase tracking-wider text-slate-400">Breached</span><strong className="mt-1 block text-lg font-extrabold text-rose-500">02</strong></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section id="security" className="relative overflow-hidden bg-[#091322] py-20 text-white sm:py-28">
          <div className="grid-dark absolute inset-0"></div>
          <div className="absolute -right-48 top-20 size-[500px] rounded-full bg-primary/15 blur-3xl"></div>
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div className="reveal" ref={addToRevealRefs}><span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#56DDB7]"><span className="h-px w-6 bg-[#56DDB7]"></span>Secure by design</span><h2 className="max-w-3xl font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">Your workspace stays private, controlled, and accountable.</h2></div>
              <p className="reveal max-w-xl text-base leading-7 text-slate-400" ref={addToRevealRefs}>NetFlow separates organization data, limits access by role, and records important actions—so teams can automate work without giving up control.</p>
            </div>

            <div className="mt-12 grid gap-4 lg:grid-cols-3">
              <article className="reveal rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur" ref={addToRevealRefs}>
                <span className="grid size-12 place-items-center rounded-2xl border border-[#56DDB7]/20 bg-[#56DDB7]/10 text-[#56DDB7]"><ShieldCheck className="size-5" /></span><span className="mt-10 block text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/30">Workspace security</span><h3 className="mt-2 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Isolated workspaces</h3><p className="mt-3 text-sm leading-6 text-slate-400">Users, records, documents, and analytics stay separated across organizations.</p>
              </article>
              <article className="reveal rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur" ref={addToRevealRefs}>
                <span className="grid size-12 place-items-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300"><KeyRound className="size-5" /></span><span className="mt-10 block text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/30">Access control</span><h3 className="mt-2 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Role-based access</h3><p className="mt-3 text-sm leading-6 text-slate-400">Control visibility and actions by role, department, workspace, and record ownership.</p>
              </article>
              <article className="reveal rounded-3xl border border-white/10 bg-white/[0.045] p-7 backdrop-blur" ref={addToRevealRefs}>
                <span className="grid size-12 place-items-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300"><Fingerprint className="size-5" /></span><span className="mt-10 block text-[9px] font-extrabold uppercase tracking-[0.14em] text-white/30">Accountability</span><h3 className="mt-2 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Complete audit history</h3><p className="mt-3 text-sm leading-6 text-slate-400">Authorized teams can trace important edits, approvals, rejections, and access changes.</p>
              </article>
            </div>

            <div className="mt-8 flex flex-col justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
              <span className="text-[9px] font-extrabold uppercase tracking-[0.18em] text-white/35">Built-in safeguards</span>
              <div className="flex flex-wrap gap-2"><span className="rounded-lg border border-white/10 px-3 py-2 text-[9px] font-bold text-white/55">Encryption in transit</span><span className="rounded-lg border border-white/10 px-3 py-2 text-[9px] font-bold text-white/55">Encryption at rest</span><span className="rounded-lg border border-white/10 px-3 py-2 text-[9px] font-bold text-white/55">S3-backed storage</span><span className="rounded-lg border border-white/10 px-3 py-2 text-[9px] font-bold text-white/55">Full audit history</span></div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center reveal" ref={addToRevealRefs}>
              <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-px w-6 bg-primary"></span>From idea to live workflow<span className="h-px w-6 bg-primary"></span></span>
              <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">Build and launch in three clear steps.</h2>
            </div>
            <div className="relative mt-14 grid gap-4 lg:grid-cols-3">
              <div className="absolute left-[16%] right-[16%] top-8 hidden border-t border-dashed border-slate-300 lg:block"></div>
              <article className="reveal relative rounded-3xl border border-slate-200 bg-white p-7" ref={addToRevealRefs}>
                <span className="relative z-10 grid size-16 place-items-center rounded-2xl border-8 border-[#FBFCFC] bg-indigo-50 font-['Manrope','DM_Sans',sans-serif] text-sm font-extrabold text-primary">01</span><h3 className="mt-8 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Describe or design</h3><p className="mt-3 text-sm leading-6 text-slate-500">Build manually or ask AI to create a structured starting point for your form or workflow.</p><span className="mt-7 inline-flex items-center gap-2 text-[10px] font-extrabold text-primary">Manual + AI builder <ArrowRight className="size-3.5" /></span>
              </article>
              <article className="reveal relative rounded-3xl border border-slate-200 bg-white p-7" ref={addToRevealRefs}>
                <span className="relative z-10 grid size-16 place-items-center rounded-2xl border-8 border-[#FBFCFC] bg-amber-50 font-['Manrope','DM_Sans',sans-serif] text-sm font-extrabold text-amber-600">02</span><h3 className="mt-8 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Connect the decisions</h3><p className="mt-3 text-sm leading-6 text-slate-500">Add owners, rules, approvals, deadlines, notifications, and integrations on the canvas.</p><span className="mt-7 inline-flex items-center gap-2 text-[10px] font-extrabold text-amber-600">Visual workflow builder <ArrowRight className="size-3.5" /></span>
              </article>
              <article className="reveal relative rounded-3xl border border-slate-200 bg-white p-7" ref={addToRevealRefs}>
                <span className="relative z-10 grid size-16 place-items-center rounded-2xl border-8 border-[#FBFCFC] bg-emerald-50 font-['Manrope','DM_Sans',sans-serif] text-sm font-extrabold text-emerald-600">03</span><h3 className="mt-8 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Publish and improve</h3><p className="mt-3 text-sm leading-6 text-slate-500">Launch with clear ownership, then use live data to improve turnaround time and remove friction.</p><span className="mt-7 inline-flex items-center gap-2 text-[10px] font-extrabold text-emerald-600">Analytics & SLA insights <ArrowRight className="size-3.5" /></span>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="resources" className="border-t border-slate-200 bg-[#F3F6F7] py-20 sm:py-28">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20 lg:px-8">
            <div className="reveal" ref={addToRevealRefs}>
              <span className="mb-5 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary"><span className="h-px w-6 bg-primary"></span>Questions, answered</span>
              <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.04] tracking-[-0.055em] sm:text-6xl">Everything you need to build with confidence.</h2>
              <p className="mt-5 max-w-md text-sm leading-6 text-slate-600">Learn how manual and AI-assisted building, approvals, security, and reporting work together in NetFlow.</p>
            </div>
            <div className="reveal overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 sm:px-7" ref={addToRevealRefs}>
              <details className="group border-b border-slate-200" open>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-bold sm:text-base">Can I build workflows manually or with AI?<span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-lg font-normal transition">+</span></summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-slate-500">Both. Build forms and workflows step by step, use AI to create a structured first draft, or combine the two. Every AI-generated draft stays editable before you publish.</p>
              </details>
              <details className="group border-b border-slate-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-bold sm:text-base">Do workflows have to start with a form?<span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-lg font-normal transition">+</span></summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-slate-500">No. A form can trigger a workflow, but you can also create a standalone workflow manually or with AI, then add steps, conditions, approvals, notifications, and actions.</p>
              </details>
              <details className="group border-b border-slate-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-bold sm:text-base">Can approvals change based on request details?<span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-lg font-normal transition">+</span></summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-slate-500">Yes. Route work by amount, department, category, requester role, or any submitted value, including multi-level approval paths.</p>
              </details>
              <details className="group border-b border-slate-200">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-bold sm:text-base">How is each company’s data protected?<span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-lg font-normal transition">+</span></summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-slate-500">NetFlow separates users, records, files, workflow definitions, and analytics by workspace. Role and department policies add another layer of controlled access.</p>
              </details>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-6 text-sm font-bold sm:text-base">Can NetFlow track deadlines and performance?<span className="faq-plus grid size-8 shrink-0 place-items-center rounded-full border border-slate-200 text-lg font-normal transition">+</span></summary>
                <p className="max-w-2xl pb-6 pr-8 text-sm leading-6 text-slate-500">Yes. Define SLAs by workflow or step, monitor active requests, notify owners, trigger escalations, and compare turnaround times across teams.</p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F3F6F7] pb-6 sm:pb-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[2rem] bg-primary px-5 py-16 text-center text-white shadow-[0_32px_100px_rgba(9,19,34,0.18)] sm:px-12 sm:py-20">
              <div className="absolute -left-40 -top-40 size-96 rounded-full border border-white/15 shadow-[0_0_0_70px_rgba(255,255,255,.035),0_0_0_140px_rgba(255,255,255,.02)]"></div>
              <div className="absolute -bottom-48 -right-36 size-96 rounded-full border border-white/15 shadow-[0_0_0_70px_rgba(255,255,255,.035),0_0_0_140px_rgba(255,255,255,.02)]"></div>
              <div className="relative mx-auto max-w-3xl">
                <span className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.16em]">Your next workflow starts here</span>
                <h2 className="font-['Manrope','DM_Sans',sans-serif] text-4xl font-extrabold leading-[1.03] tracking-[-0.055em] sm:text-6xl">Turn your next process into a workflow that works.</h2>
                <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-indigo-100">Build it manually, ask AI for a structured first draft, or combine both approaches. NetFlow keeps every form, decision, approval, and outcome connected.</p>
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                  <button onClick={() => setIsModalOpen(true)} className="group inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-extrabold text-[#091322] shadow-xl transition hover:-translate-y-0.5">Book a tailored demo <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></button>
                  <a href="#platform" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-white/15">Explore NetFlow</a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#091322] pb-7 pt-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_repeat(4,1fr)]">
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/dashboard" className="flex items-center gap-2.5">
                <img src="/netflow-icon.png" alt="NetFlow" className="size-9 rounded-xl shadow-lg" />
                <span className="font-['Manrope','DM_Sans',sans-serif] text-xl font-extrabold tracking-[-0.05em]">NetFlow</span>
              </Link>
              <p className="mt-5 max-w-xs text-xs leading-6 text-slate-500">Build forms and workflows manually or with AI, automate approvals, track progress, and keep every important action visible.</p>
            </div>
            <div><h3 className="mb-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/35">Product</h3><div className="space-y-3 text-xs text-slate-400"><a className="block hover:text-white" href="#platform">Form builder</a><a className="block hover:text-white" href="#platform">Workflow engine</a><a className="block hover:text-white" href="#analytics">Analytics & SLAs</a><a className="block hover:text-white" href="#capabilities">Document management</a></div></div>
            <div><h3 className="mb-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/35">Solutions</h3><div className="space-y-3 text-xs text-slate-400"><a className="block hover:text-white" href="#solutions">Human Resources</a><a className="block hover:text-white" href="#solutions">IT & Operations</a><a className="block hover:text-white" href="#solutions">Finance</a><a className="block hover:text-white" href="#security">Enterprise</a></div></div>
            <div><h3 className="mb-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/35">Resources</h3><div className="space-y-3 text-xs text-slate-400"><a className="block hover:text-white" href="#resources">Help center</a><a className="block hover:text-white" href="#resources">API docs</a><a className="block hover:text-white" href="#resources">Workflow library</a><a className="block hover:text-white" href="#analytics">Product updates</a></div></div>
            <div><h3 className="mb-4 text-[9px] font-extrabold uppercase tracking-[0.15em] text-white/35">Company</h3><div className="space-y-3 text-xs text-slate-400"><a className="block hover:text-white" href="#top">About</a><a className="block hover:text-white" href="#security">Security</a><a className="block hover:text-white" href="#top">Contact</a><a className="block hover:text-white" href="#top">Careers</a></div></div>
          </div>
          <div className="flex flex-col gap-4 pt-6 text-[10px] text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 NetFlow, Inc. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-5"><a href="#top" className="hover:text-white">Privacy</a><a href="#top" className="hover:text-white">Terms</a><span className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-[#56DDB7]"></span>All systems operational</span></div>
          </div>
        </div>
      </footer>

      {/* Demo modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-md" role="dialog" aria-modal="true" onClick={(e) => { if(e.target === e.currentTarget) setIsModalOpen(false) }}>
          <div className="max-h-[calc(100vh-2rem)] w-full max-w-xl overflow-auto rounded-[1.75rem] bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-200 px-5 py-5 sm:px-7">
              <div><span className="mb-2 inline-flex rounded-md bg-indigo-50 px-2 py-1 text-[8px] font-extrabold uppercase tracking-wider text-primary">Built around your process</span><h2 className="font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold tracking-tight">See how NetFlow fits your team</h2><p className="mt-1 text-xs text-slate-500">Tell us what you want to build or automate.</p></div>
              <button onClick={() => setIsModalOpen(false)} className="grid size-9 shrink-0 place-items-center rounded-xl border border-slate-200 text-slate-500 transition hover:bg-slate-50" aria-label="Close dialog"><X className="size-4" /></button>
            </div>
            {!demoSubmitted ? (
              <form onSubmit={handleDemoSubmit} className="space-y-4 p-5 sm:p-7">
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-bold text-slate-600">First name<input required name="firstName" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100" placeholder="Aman" /></label>
                  <label className="text-xs font-bold text-slate-600">Last name<input required name="lastName" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100" placeholder="Khan" /></label>
                </div>
                <label className="block text-xs font-bold text-slate-600">Work email<input required type="email" name="email" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100" placeholder="aman@company.com" /></label>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="text-xs font-bold text-slate-600">Company<input required name="company" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100" placeholder="Your company" /></label>
                  <label className="text-xs font-bold text-slate-600">Team size<select required name="size" className="mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100"><option value="">Select size</option><option>1–50</option><option>51–250</option><option>251–1,000</option><option>1,000+</option></select></label>
                </div>
                <label className="block text-xs font-bold text-slate-600">What process would you like to improve?<textarea name="process" rows={3} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-normal outline-none transition focus:border-primary focus:ring-4 focus:ring-indigo-100" placeholder="Purchase approvals, employee onboarding, IT access requests..."></textarea></label>
                <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-extrabold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-600">Request a tailored demo <ArrowRight className="size-4" /></button>
              </form>
            ) : (
              <div className="px-7 py-12 text-center">
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500 text-white shadow-xl shadow-emerald-500/20"><Check className="size-7" /></span>
                <h3 className="mt-5 font-['Manrope','DM_Sans',sans-serif] text-2xl font-extrabold">Thanks—we’ve got your request.</h3>
                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">Our team will follow up to learn about your process and prepare a relevant walkthrough.</p>
                <button onClick={() => { setIsModalOpen(false); setDemoSubmitted(false); }} className="mt-6 rounded-xl bg-[#091322] px-5 py-3 text-sm font-bold text-white">Back to NetFlow</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
