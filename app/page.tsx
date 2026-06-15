'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const navigation = [
  { name: 'Beranda', href: './' },
  { name: 'Cari Kerja', href: './jobs' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900 min-h-screen text-white selection:bg-indigo-500/30 relative overflow-hidden">
      
      <header className="absolute inset-x-0 top-0 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 transition-transform active:scale-95">
              <span className="sr-only">Your Company</span>
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
          </div>
          
          <div className="hidden lg:flex lg:gap-x-12 lg:ml-8">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-white transition hover:text-indigo-400">
                {item.name}
              </a>
            ))}
          </div>
          
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">

          </div>
          
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white active:scale-95 transition-transform"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
        </nav>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="w-full border-l border-white/10 bg-gray-900 p-6 sm:max-w-sm">
            <SheetHeader className="text-left mb-6">
              <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
              <Link href="/" className="-m-1.5 p-1.5 inline-block">
                <span className="sr-only">Your Company</span>
                <img
                  alt="Logo"
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
                <div className="py-6">

                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="relative isolate px-6 pt-14 lg:px-8">
        {/* Top Polygon Restored */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#828081] to-[#5c5c5d] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-in fade-in duration-1000"
          />
        </div>
        
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
               <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-pink-500">Temukan Karier Impian atau Bakat</span>  <span className="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-500 to-pink-500">Terbaik Anda</span>
              <span className="mt-2 block text-white"></span>
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-700 fill-mode-both">
              <Link
                href="./jobs"
                className="rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
              >
                Mulai Cari Kerja
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bottom Polygon Restored */}
        <div
          aria-hidden="true"
          className="absolute top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] pointer-events-none"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#9a9a9a] to-[#878788] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] animate-in fade-in duration-1000 delay-500"
          />
        </div>
      </main>
    </div>
  )
}