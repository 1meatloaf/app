'use client'

import Link from 'next/link'
import { useState, type FormEvent } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const navigation = [
  { name: 'Beranda', href: '../' },
  { name: 'Cari Kerja', href: '../jobs' },
]

export default function LoginPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log('Login', { email, password })
  }

  return (
    <div className="bg-[#101010] text-white min-h-screen flex flex-col selection:bg-indigo-500/30 overflow-hidden relative">
      <header className="absolute inset-x-0 top-0 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 transition-transform active:scale-95">
              <span className="sr-only">Slate</span>
              <img
                alt="Slate logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12 lg:items-center">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold text-white transition hover:text-indigo-400">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white active:scale-95 transition-transform"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </nav>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="w-full border-l border-white/10 bg-[#101010] p-6 sm:max-w-sm">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <Link href="/" className="-m-1.5 p-1.5 inline-block">
                <span className="sr-only">Slate</span>
                <img
                  alt="Slate logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </Link>
            </SheetHeader>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white transition-colors hover:bg-white/5 active:bg-white/10"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="relative isolate flex flex-1 items-center justify-center px-6 py-24 sm:px-10 lg:px-12">
        {/* Original Radial Gradient Restored */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none animate-in fade-in duration-1000"
          style={{
            backgroundImage:
              'radial-gradient(circle at top left, rgba(107,100,255,0.3), transparent 40%), radial-gradient(circle at bottom right, rgba(14,165,233,0.15), transparent 40%)',
          }}
        />

        <div className="w-full max-w-md z-10">
          <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400 mb-3">Welcome Back</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Login
            </h1>
            <p className="mt-4 text-base text-gray-400">
              Masuk sebagai administrator
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gray-950/80 p-8 shadow-[0_25px_100px_-40px_rgba(0,0,0,0.75)] sm:p-12 backdrop-blur-md animate-in fade-in zoom-in-95 duration-700 delay-300 fill-mode-both">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="peer h-12 w-full rounded-xl bg-gray-900/50 border border-white/10 px-4 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="Email"
                  required
                />
                <label
                  htmlFor="email"
                  className="absolute left-4 -top-2.5 bg-[#080b19] px-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400 cursor-text rounded"
                >
                  Email
                </label>
              </div>

              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="peer h-12 w-full rounded-xl bg-gray-900/50 border border-white/10 px-4 pr-12 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  placeholder="Password"
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 -top-2.5 bg-[#080b19] px-1 text-sm text-gray-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400 cursor-text rounded"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword((current) => !current)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors active:scale-95"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.19-3.344m2.864-2.863A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a10.05 10.05 0 01-1.11 2.158M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              <button
                type="submit"
                className="w-full mt-8 rounded-xl bg-indigo-500 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                Masuk
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-400">
              <p>
                Belum punya akun?{' '}
                <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                  Daftar di sini
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}