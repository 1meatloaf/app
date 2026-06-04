'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const navigation = [
  { name: 'Beranda', href: './' },
  { name: 'Cari Kerja', href: './jobs' },
]

const jobs = [
  {
    title: 'Frontend Developer',
    company: 'Slate Motors',
    salary: 'Rp 12.000.000 - Rp 18.000.000',
    description: 'Bekerja pada tim produk untuk mengembangkan fitur frontend menggunakan React dan Next.js.',
    image: '/images/car-01.png',
  },
  {
    title: 'Backend Engineer',
    company: 'Slate Automotive',
    salary: 'Rp 14.000.000 - Rp 20.000.000',
    description: 'Bangun API handal dengan Node.js, Express, dan database skala besar.',
    image: '/images/car-02.png',
  },
  {
    title: 'Product Designer',
    company: 'Slate Creative',
    salary: 'Rp 10.000.000 - Rp 15.000.000',
    description: 'Rancang antarmuka yang menarik dan intuitif untuk pengalaman pengguna terbaik.',
    image: '/images/car-03.png',
  },
]

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  const prevSlide = () => setActiveIndex((current) => (current === 0 ? jobs.length - 1 : current - 1))
  const nextSlide = () => setActiveIndex((current) => (current === jobs.length - 1 ? 0 : current + 1))

  return (
    <div className="bg-gray-950 text-white">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Slate</span>
              <img
                alt="Slate logo"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </a>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 lg:ml-8">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm font-semibold text-white hover:text-indigo-400">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="./login" className="text-sm font-semibold text-white rounded-md bg-indigo-500 px-4 py-2 shadow-lg shadow-indigo-500/20 hover:bg-indigo-400">
              Masuk
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50 bg-black/50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-950 p-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Slate</span>
                <img
                  alt="Slate logo"
                  src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-white"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold text-white hover:bg-white/5"
                  >
                    Masuk
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      <main className="relative isolate overflow-hidden bg-[#101010] px-6 pt-28 pb-24 sm:px-10 lg:px-12">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(107, 100, 255, 0.83),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.1),_transparent_30%)]" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 text-center sm:mx-auto sm:max-w-2xl">
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Early reservations are filling fast</p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Temukan Lowongan Favorit Anda
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400">
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30">
            <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-center opacity-20" />
            <div className="relative grid gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-12">
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_100px_-40px_rgba(0,0,0,0.75)]">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Job slider</p>
                      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">{jobs[activeIndex].title}</h2>
                      <p className="mt-2 text-sm text-slate-400">{jobs[activeIndex].company} · {jobs[activeIndex].location}</p>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10">
                      {activeIndex + 1} / {jobs.length}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/90 p-5">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Salary</p>
                      <p className="mt-2 text-lg font-semibold text-white">{jobs[activeIndex].salary}</p>
                    </div>
                  </div>

                  <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300">
                    {jobs[activeIndex].description}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-white transition hover:border-indigo-400 hover:text-indigo-400"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-white transition hover:border-indigo-400 hover:text-indigo-400"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>

                  <div className="sm:col-span-1">
                    <div className="flex items-center gap-3">
                      {jobs.map((job, index) => (
                        <button
                          key={job.title}
                          type="button"
                          onClick={() => setActiveIndex(index)}
                          className={`h-3 w-3 rounded-full transition ${index === activeIndex ? 'bg-indigo-400' : 'bg-white/25 hover:bg-white/40'}`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5">
                <div className="relative h-80 overflow-hidden rounded-3xl bg-slate-900/90">
                  <Image
                    src={jobs[activeIndex].image}
                    alt={jobs[activeIndex].title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-300">
                  <span className="rounded-full bg-white/5 px-3 py-2">{jobs[activeIndex].company}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
