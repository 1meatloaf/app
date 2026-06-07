'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Bars3Icon } from '@heroicons/react/24/outline'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Cari Kerja', href: '/jobs' },
]

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900 min-h-screen text-white selection:bg-indigo-500/30 relative overflow-hidden">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <img
                alt="Logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold hover:text-indigo-400"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold"
            >
              Masuk
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5"
            >
              <Bars3Icon className="size-6" />
            </button>
          </div>
        </nav>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>Menu Navigasi</SheetTitle>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </header>

      <main>
        
      </main>
    </div>
  )
}