'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import Link from 'next/link'
import Image from 'next/image'
import { Bars3Icon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const navigation = [
  { name: 'Beranda', href: '/' },
  { name: 'Cari Kerja', href: '/jobs' },
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
  const [applyOpen, setApplyOpen] = useState(false)
  
  // Form State
  const [applicantName, setApplicantName] = useState('')
  const [applicantEmail, setApplicantEmail] = useState('')
  const [coverLetter, setCoverLetter] = useState('')
  const [applicantLocation, setApplicantLocation] = useState('')
  const [applicantLastEducation, setApplicantLastEducation] = useState("Bachelor's Degree")
  const [driveTab, setDriveTab] = useState<'upload' | 'drive'>('drive')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  
  const prevSlide = () => setActiveIndex((current) => (current === 0 ? jobs.length - 1 : current - 1))
  const nextSlide = () => setActiveIndex((current) => (current === jobs.length - 1 ? 0 : current + 1))

  return (
    <div className="bg-[#101010] text-white selection:bg-indigo-500/30 min-h-screen relative overflow-hidden">
      
      {/* Animated Header */}
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
          
          <div className="hidden lg:flex lg:gap-x-12 lg:ml-8">
            {navigation.map((item) => (
              <Link key={item.name} href={item.href} className="text-sm font-semibold text-white transition hover:text-indigo-400">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="/login"
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
            >
              Masuk
            </Link>
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

        {/* Mobile Navigation Sheet */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="w-full border-l border-white/10 bg-gray-950 p-6 sm:max-w-sm">
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
                <div className="py-6">
                  <Link
                    href="./login"
                    className="-mx-3 block rounded-md bg-indigo-500 px-3 py-2.5 text-center text-base font-semibold text-white shadow-md transition duration-300 hover:bg-indigo-600 active:scale-[0.98]"
                  >
                    Masuk
                  </Link>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      <main className="relative isolate px-6 pb-24 pt-28 sm:px-10 lg:px-12">
        {/* Animated Background Gradients */}
        <div
          className="absolute inset-0 -z-10 animate-in fade-in duration-1000 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at top left, rgba(107,100,255,0.25), transparent 40%), radial-gradient(circle at bottom right, rgba(14,165,233,0.15), transparent 40%)',
          }}
        />

        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col gap-6 text-center sm:mx-auto sm:max-w-2xl">
            {/* Staggered Text Animations */}
            <p className="text-sm uppercase tracking-[0.3em] text-indigo-400 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
              Early reservations are filling fast
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
              Temukan Lowongan Favorit Anda
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-slate-400 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              Jelajahi berbagai peluang karier yang sesuai dengan minat dan bakat Anda. Kami menghubungkan Anda dengan perusahaan-perusahaan terkemuka.
            </p>
          </div>

          {/* Animated Job Slider Card */}
          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-black/30 transition-all duration-500 hover:border-white/20 hover:shadow-indigo-500/10 animate-in fade-in zoom-in-95 duration-700 delay-700 fill-mode-both">
            <div className="absolute inset-0 bg-[url('/images/bg.png')] bg-cover bg-center opacity-20" />
            <div className="relative grid gap-8 px-6 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:px-10 lg:py-12">
              
              <div className="space-y-6">
                <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 shadow-[0_25px_100px_-40px_rgba(0,0,0,0.75)] backdrop-blur-sm">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.3em] text-indigo-400">Job slider</p>
                      <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl transition-all duration-300">{jobs[activeIndex].title}</h2>
                    </div>
                    <div className="inline-flex items-center rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 ring-1 ring-white/10">
                      {activeIndex + 1} / {jobs.length}
                    </div>
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/90 p-5 ring-1 ring-white/5 transition hover:ring-white/10">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Salary</p>
                      <p className="mt-2 text-lg font-semibold text-white transition-all duration-300">{jobs[activeIndex].salary}</p>
                    </div>
                  </div>

                  <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300 transition-all duration-300">
                    {jobs[activeIndex].description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-white transition-all hover:border-indigo-400 hover:text-indigo-400 active:scale-95"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/80 text-white transition-all hover:border-indigo-400 hover:text-indigo-400 active:scale-95"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>

                  <div className="ml-4 flex items-center gap-3">
                    {jobs.map((job, index) => (
                      <button
                        key={job.title}
                        type="button"
                        onClick={() => setActiveIndex(index)}
                        className={`h-3 w-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-indigo-400 w-6' : 'bg-white/25 hover:bg-white/40'}`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/80 p-5 backdrop-blur-sm flex flex-col justify-between">
                <div className="relative h-80 overflow-hidden rounded-3xl bg-slate-900/90 group">
                  {/* Note: Ensure the image path exists, otherwise use a placeholder */}
                  <div className="absolute inset-0 bg-slate-800 flex items-center justify-center text-slate-500">
                    Image Placeholder
                  </div>
                  <Image
                    src={jobs[activeIndex].image}
                    alt={jobs[activeIndex].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105 z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-20" />
                </div>
                <div className="mt-6 flex items-center justify-between gap-3 text-sm text-slate-300">
                  <span className="rounded-full bg-white/10 px-4 py-2 font-medium text-white transition-all duration-300">
                    {jobs[activeIndex].company}
                  </span>
                  <button
                    type="button"
                    onClick={() => setApplyOpen(true)}
                    className="rounded-md bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
                  >
                    Apply Now
                  </button>
                </div>
              </div>

            </div>
          </section>
        </div>
      </main>

      {/* Apply Form Sheet */}
      <Sheet open={applyOpen} onOpenChange={setApplyOpen}>
        <SheetContent side="right" className="w-full max-w-md overflow-y-auto border-l border-white/10 bg-slate-950 p-6 sm:max-w-md">
          <SheetHeader className="text-left">
            <SheetTitle className="text-xl font-semibold text-white">Apply for {jobs[activeIndex].title}</SheetTitle>
            <SheetDescription className="text-slate-400">
              Isi formulir ini untuk melamar posisi di <span className="text-white font-medium">{jobs[activeIndex].company}</span>.
            </SheetDescription>
          </SheetHeader>

          <form
            className="mt-8 space-y-6"
            onSubmit={(event) => {
              event.preventDefault()
      
              console.log('Apply submitted', {
                job: jobs[activeIndex].title,
                company: jobs[activeIndex].company,
                applicantName,
                applicantEmail,
                applicantLocation,
                applicantLastEducation,
                coverLetter,
                uploadedFiles: uploadedFiles.map((file) => file.name),
              })
      
              setApplyOpen(false)
      
              setApplicantName('')
              setApplicantEmail('')
              setApplicantLocation('')
              setApplicantLastEducation("Bachelor's Degree")
              setDriveTab('drive')
              setUploadedFiles([])
              setCoverLetter('')
    
              toast.success("Application Submitted!", {
                description: `Your application for ${jobs[activeIndex].title} at ${jobs[activeIndex].company} has been sent. We'll be in touch soon.`,
                duration: 5000, 
              })
            }}
          >
            <div className="relative">
              <input
                id="apply-name"
                name="apply-name"
                type="text"
                value={applicantName}
                onChange={(event) => setApplicantName(event.target.value)}
                placeholder="Name"
                className="peer w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                required
              />
              <label
                htmlFor="apply-name"
                className="absolute left-4 -top-2.5 rounded bg-slate-950 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400 cursor-text"
              >
                Nama Lengkap
              </label>
            </div>

            <div className="relative">
              <input
                id="apply-email"
                name="apply-email"
                type="email"
                value={applicantEmail}
                onChange={(event) => setApplicantEmail(event.target.value)}
                placeholder="Email"
                className="peer w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                required
              />
              <label
                htmlFor="apply-email"
                className="absolute left-4 -top-2.5 rounded bg-slate-950 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400 cursor-text"
              >
                Alamat Email
              </label>
            </div>

            <div className="relative">
              <input
                id="apply-location"
                name="apply-location"
                type="text"
                value={applicantLocation}
                onChange={(event) => setApplicantLocation(event.target.value)}
                placeholder="Location (city, address or coordinates)"
                className="peer w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                required
              />
              <label
                htmlFor="apply-location"
                className="absolute left-4 -top-2.5 rounded bg-slate-950 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400 cursor-text"
              >
                Domisili
              </label>
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (!navigator.geolocation) {
                      alert('Geolocation not supported in this browser')
                      return
                    }
                    navigator.geolocation.getCurrentPosition(
                      (pos) => setApplicantLocation(`${pos.coords.latitude.toFixed(6)}, ${pos.coords.longitude.toFixed(6)}`),
                      () => alert('Unable to retrieve your location')
                    )
                  }}
                  className="rounded-lg bg-slate-800 px-3 py-2 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
                >
                  Lokasi terbaru
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const parts = applicantLocation.split(/[,\s]+/).map(Number)
                    const lat = parts.length >= 2 && !Number.isNaN(parts[0]) ? parts[0] : -6.200000 // default to Jakarta
                    const lng = parts.length >= 2 && !Number.isNaN(parts[1]) ? parts[1] : 106.816666
                    const url = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=12/${lat}/${lng}`
                    window.open(url, '_blank')
                  }}
                  className="rounded-lg border border-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/5 transition-colors"
                >
                  Buka map
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">Pendidikan Terakhir</label>
              <select
                value={applicantLastEducation}
                onChange={(e) => setApplicantLastEducation(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              >
                <option>Gelar Sarjana</option>
                <option>Gelar Magister</option>
                <option>Diploma</option>
                <option>SMA/SMK</option>
              </select>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
              <div className="flex rounded-full border border-white/10 bg-slate-950/80 p-1">
                <button
                  type="button"
                  onClick={() => setDriveTab('drive')}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${driveTab === 'drive' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Google Drive
                </button>
                <button
                  type="button"
                  onClick={() => setDriveTab('upload')}
                  className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${driveTab === 'upload' ? 'bg-slate-900 text-white' : 'text-slate-400 hover:text-white'}`}
                >
                  Upload File
                </button>
              </div>

              {driveTab === 'drive' ? (
                <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/90 p-6 text-center">
                  <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
                    <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 3h14l3 5v10l-3 5H5L2 8l3-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 7h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <p className="text-sm font-semibold text-white">Unggah materi</p>
                  <p className="mt-2 text-sm text-slate-400">Pilih file dari Google Drive Anda setelah masuk dengan akun Anda.</p>
                  <button
                    type="button"
                    onClick={() => window.open('https://drive.google.com/drive/my-drive', '_blank')}
                    className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 active:scale-95"
                  >
                    Sign in
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <label className="block text-sm text-slate-400">Unggah dokumen</label>
                  <input
                    type="file"
                    multiple
                    onChange={(event) => {
                      if (!event.target.files) return
                      setUploadedFiles(Array.from(event.target.files))
                    }}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/80 p-3 max-h-32 overflow-y-auto">
                      {uploadedFiles.map((file) => (
                        <div key={file.name} className="flex items-center justify-between gap-2 rounded-lg bg-slate-900 px-3 py-2">
                          <span className="truncate text-sm text-white">{file.name}</span>
                          <span className="text-xs text-slate-400 shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="relative">
              <textarea
                id="apply-cover"
                name="apply-cover"
                value={coverLetter}
                onChange={(event) => setCoverLetter(event.target.value)}
                placeholder="Surat Lamaran"
                className="peer h-36 w-full resize-none rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white placeholder-transparent focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                required
              />
              <label
                htmlFor="apply-cover"
                className="absolute left-4 -top-2.5 rounded bg-slate-950 px-1 text-sm text-slate-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-500 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-400 cursor-text"
              >
                Surat Lamaran
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-indigo-500 px-5 py-3.5 text-base font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-[0.98]"
            >
              Submit Application
            </button>
          </form>
        </SheetContent>
      </Sheet>
    </div>
  )
}