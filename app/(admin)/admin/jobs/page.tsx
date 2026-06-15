'use client'

import { useEffect, useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import Link from 'next/link'
import { 
  Bars3Icon, 
  BriefcaseIcon, 
  BanknotesIcon, 
  PencilSquareIcon, 
  TrashIcon,
  PhotoIcon,
  PlusIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const JOBS_STORAGE_KEY = 'slate-jobs'

const navigation = [
  { name: 'Pelamar', href: '/admin' },
  { name: 'Gawe', href: '/admin/jobs' },
]

// Initial Mock Data
const initialJobs = [
  {
    id: 1,
    title: 'Back End Developer',
    division: 'Slate Motors',
    minSalary: 14000000.50,
    maxSalary: 20000000.00,
    description: 'Bangun API dengan Node.js, Express, dan database skala besar.',
    image: '/images/backend-job.png',
    requirements: 'Usia maksimal 32 tahun. Pengalaman minimal 3 tahun, termasuk Node.js dan PostgreSQL. Terbuka untuk semua gender.'
  },
  {
    id: 2,
    title: 'Front End Developer',
    division: 'Engineering',
    minSalary: 12000000.00,
    maxSalary: 18000000.75,
    description: 'Bekerja pada tim produk untuk mengembangkan fitur frontend menggunakan React dan Next.js.',
    image: '/images/frontend-job.png',
    requirements: 'Usia antara 23-30 tahun. Pengalaman React minimal 2 tahun, kemampuan komunikasi baik.'
  },
  {
    id: 3,
    title: 'User Interface Designer',
    division: 'Design',
    minSalary: 10000000.00,
    maxSalary: 15000000.00,
    description: 'Rancang antarmuka yang menarik dan intuitif untuk pengalaman pengguna.',
    image: '/images/ui-job.png',
    requirements: 'Minimal lulusan D3/S1 Desain. Harus membawa portofolio UI/UX. Diutamakan perempuan untuk proyek ini.'
  }
]

export default function JobsAdminPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // State for jobs list
  const [jobs, setJobs] = useState(initialJobs)

  // Custom Modals State
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    jobId: number | null;
  }>({ isOpen: false, jobId: null })
  
  const [logoutDialog, setLogoutDialog] = useState(false)
  
  // High-res Image Lightbox Preview State
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  useEffect(() => {
    const storedJobs = localStorage.getItem(JOBS_STORAGE_KEY)
    if (storedJobs) {
      try {
        const parsed = JSON.parse(storedJobs)
        if (Array.isArray(parsed)) {
          setJobs(parsed)
        }
      } catch (error) {
        console.warn('Failed to parse stored jobs:', error)
      }
    }
  }, [])

  const saveJobs = (nextJobs: typeof initialJobs) => {
    localStorage.setItem(JOBS_STORAGE_KEY, JSON.stringify(nextJobs))
  }
  
  // Form handling state
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  
  // Form fields
  const [title, setTitle] = useState('')
  const [division, setDivision] = useState('')
  const [minSalary, setMinSalary] = useState('')
  const [maxSalary, setMaxSalary] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState('')
  const [driveTab, setDriveTab] = useState<'upload' | 'drive'>('drive')
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [driveLinkInput, setDriveLinkInput] = useState('')
  const [requirements, setRequirements] = useState('')

  // Intercept & clean Google Drive file links to adjust itself to raw viewable stream
  const handleImageUrlChange = (val: string) => {
    const fileIdMatch = val.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || val.match(/id=([a-zA-Z0-9_-]+)/)
    if (fileIdMatch && fileIdMatch[1]) {
      const directUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[1]}`
      setImage(directUrl)
      toast.info('Link Google Drive Disesuaikan', {
        description: 'Tautan berbagi dikonversi menjadi URL stream gambar langsung.',
      })
    } else {
      setImage(val)
    }
  }

  // Handle local image uploads via FileReader for full base64 localStorage persistence
  const handleLocalFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) return
    const file = event.target.files[0]
    setUploadedFiles(Array.from(event.target.files))

    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setImage(reader.result)
          toast.success('Gambar Lokal Dimuat', {
            description: 'Berkas gambar berhasil diproses dan dikaitkan ke lowongan kerja.',
          })
        }
      }
      reader.readAsDataURL(file)
    } else {
      toast.error('Format Tidak Didukung', {
        description: 'Silakan pilih berkas gambar (PNG, JPG, WebP) untuk pratinjau otomatis.',
      })
    }
  }

  // Helper to format currency
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { 
      style: 'currency', 
      currency: 'IDR', 
      minimumFractionDigits: 0,
      maximumFractionDigits: 2 
    }).format(amount)
  }

  // Helper to group jobs by division
  const groupJobsByDivision = (jobsList: typeof initialJobs) => {
    const grouped = jobsList.reduce((acc, job) => {
      const divisionGroup = acc.find(g => g.division === job.division)
      if (divisionGroup) {
        divisionGroup.jobs.push(job)
      } else {
        acc.push({ division: job.division, jobs: [job] })
      }
      return acc
    }, [] as Array<{ division: string; jobs: typeof initialJobs }>)
    return grouped
  }

  // Open form to add new job
  const handleAddClick = () => {
    setEditingId(null)
    setTitle('')
    setDivision('')
    setMinSalary('')
    setMaxSalary('')
    setDescription('')
    setImage('')
    setDriveLinkInput('')
    setUploadedFiles([])
    setRequirements('')
    setIsFormOpen(true)
  }

  // Open form to edit existing job
  const handleEditClick = (job: typeof initialJobs[0]) => {
    setEditingId(job.id)
    setTitle(job.title)
    setDivision(job.division)
    setMinSalary(job.minSalary.toString())
    setMaxSalary(job.maxSalary.toString())
    setDescription(job.description)
    setImage(job.image)
    setDriveLinkInput(job.image.includes('drive.google.com') ? job.image : '')
    setUploadedFiles([])
    setRequirements(job.requirements)
    setIsFormOpen(true)
  }

  // Trigger delete modal
  const handleDeleteRequest = (id: number) => {
    setDeleteDialog({ isOpen: true, jobId: id })
  }

  // Execute delete after confirmation
  const confirmDelete = () => {
    if (deleteDialog.jobId !== null) {
      const nextJobs = jobs.filter(job => job.id !== deleteDialog.jobId)
      const deletedJob = jobs.find(job => job.id === deleteDialog.jobId)
      setJobs(nextJobs)
      saveJobs(nextJobs)
      
      toast.success('Lowongan Dihapus', {
        description: `Lowongan "${deletedJob?.title}" berhasil dihapus dari sistem.`,
      })
    }
    setDeleteDialog({ isOpen: false, jobId: null })
  }

  const closeDeleteModal = () => {
    setDeleteDialog({ isOpen: false, jobId: null })
  }

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const jobData = {
      id: editingId || Date.now(),
      title,
      division,
      company: division,
      minSalary: parseFloat(minSalary),
      maxSalary: parseFloat(maxSalary),
      description,
      image: image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600',
      requirements,
    }

    const nextJobs = editingId
      ? jobs.map(job => job.id === editingId ? jobData : job)
      : [...jobs, jobData]

    setJobs(nextJobs)
    saveJobs(nextJobs)
    setIsFormOpen(false)

    toast.success(editingId ? 'Lowongan Diperbarui!' : 'Lowongan Baru Ditambahkan!', {
      description: `Data untuk posisi ${title} telah berhasil disimpan.`,
    })
  }

  // Handle Logout Confirmation
  const confirmLogout = () => {
    setLogoutDialog(false)
    router.push('/login')
  }

  return (
    <div className="bg-[#0f1117] min-h-screen text-white selection:bg-indigo-500/30 relative overflow-hidden">
      {/* Navigation */}
      <header className="absolute inset-x-0 top-0 z-50 animate-in fade-in slide-in-from-top-4 duration-700">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8 border-b border-white/5">
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 transition-transform active:scale-95">
              <span className="sr-only">Slate</span>
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
                className={`text-sm font-semibold transition-colors ${item.name === 'Gawe' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <button
              onClick={() => setLogoutDialog(true)}
              className="rounded-md bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition duration-300 hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-500/40 active:scale-95"
            >
              Keluar
            </button>
          </div>

          <div className="flex lg:hidden gap-4 items-center">
            <button
               onClick={() => setLogoutDialog(true)}
               className="text-sm font-semibold text-white hover:text-indigo-400"
            >
              Keluar
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2.5 text-white"
            >
              <Bars3Icon className="size-6" />
            </button>
          </div>
        </nav>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="right" className="bg-[#0f1117] border-l border-white/10">
            <SheetHeader>
              <SheetTitle className="text-white">Menu Navigasi</SheetTitle>
            </SheetHeader>
            <div className="mt-6 flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-white hover:bg-white/5 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Main Content */}
      <main className="relative isolate pt-24 px-6 lg:px-8 max-w-5xl mx-auto pb-20">
        
        {/* Job Postings Card */}
        <div className="mt-12 rounded-xl border border-white/10 bg-[#161b22] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          
          {/* Card Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-white/10 bg-[#161b22]">
            <div>
              <h2 className="text-2xl font-bold text-white">Daftar Gawe</h2>
              <p className="mt-2 text-sm text-gray-400">
                Kelola seluruh daftar lowongan pekerjaan, deskripsi, gaji, dan gambar representasinya.
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={handleAddClick}
                className="inline-flex items-center gap-2 rounded-md bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 active:scale-95"
              >
                <PlusIcon className="h-4 w-4" strokeWidth={2.5} />
                Tambah Gawe Baru
              </button>
            </div>
          </div>

          {/* Job List */}
          <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
            <ul className="divide-y divide-white/5">
              {jobs.length === 0 ? (
                <li className="p-12 flex flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-white/5 p-4 mb-4">
                    <BriefcaseIcon className="h-8 w-8 text-gray-500" />
                  </div>
                  <h3 className="text-lg font-medium text-white">Belum ada lowongan tersimpan</h3>
                  <p className="mt-1 text-sm text-gray-500">Mulai dengan menambahkan lowongan kerja pertama Anda.</p>
                </li>
              ) : (
                groupJobsByDivision(jobs).map((divisionGroup) => (
                  <Fragment key={divisionGroup.division}>
                    {/* Sticky Division Group Header */}
                    <li className="sticky top-0 z-10 bg-[#161b22]/95 backdrop-blur-md py-3 px-6 text-sm font-bold text-indigo-400 border-y border-white/10 shadow-sm">
                      {divisionGroup.division}
                    </li>
                    {/* Jobs in Division */}
                    {divisionGroup.jobs.map((job) => (
                      <li key={job.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6 hover:bg-white/[0.03] transition-colors group">
                        
                        {/* Left Side Content Wrap */}
                        <div className="flex flex-1 items-start sm:items-center gap-4">
                          {/* Clickable Image Thumbnail for Lighbox Expansion */}
                          {job.image ? (
                            <button 
                              type="button"
                              onClick={() => setPreviewImage(job.image)}
                              className="h-14 w-14 rounded-xl border border-white/10 bg-cover bg-center shrink-0 shadow-inner bg-slate-800 flex items-center justify-center relative group-hover:border-indigo-500/50 transition-all hover:scale-105 active:scale-95 cursor-zoom-in"
                              style={{ backgroundImage: `url(${job.image})` }}
                              title="Sentuh untuk memperbesar gambar"
                            >
                              <div className="absolute inset-0 bg-black/10 rounded-xl hover:bg-black/0 transition-colors" />
                            </button>
                          ) : (
                            <div className="h-14 w-14 rounded-xl border border-white/5 bg-white/5 flex items-center justify-center shrink-0 text-gray-500">
                              <PhotoIcon className="h-6 w-6" />
                            </div>
                          )}

                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-white group-hover:text-indigo-300 transition-colors mb-2">
                              {job.title}
                            </h3>
                            
                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-400">
                              <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-md">
                                <BriefcaseIcon className="h-4 w-4 text-gray-500" />
                                {job.division}
                              </div>
                              <div className="flex items-center gap-2 bg-white/5 px-2.5 py-1 rounded-md">
                                <BanknotesIcon className="h-4 w-4 text-emerald-500" />
                                <span className="text-gray-300">{formatRupiah(job.minSalary)} - {formatRupiah(job.maxSalary)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Control Actions Row */}
                        <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditClick(job)}
                            className="p-2.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                            title="Edit Gawe"
                          >
                            <PencilSquareIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRequest(job.id)}
                            className="p-2.5 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors"
                            title="Hapus Gawe"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </Fragment>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>

      {/* CRUD Form Drawer (Sheet) */}
      <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
        <SheetContent side="right" className="w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#0f1117] p-6 custom-scrollbar">
          <SheetHeader className="text-left mb-8">
            <SheetTitle className="text-2xl font-bold text-white">
              {editingId ? 'Edit Lowongan' : 'Tambah Lowongan Baru'}
            </SheetTitle>
            <SheetDescription className="text-gray-400">
              Isi rincian informasi lowongan pekerjaan di bawah ini.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                Header Gawe (Job Title)
              </label>
              <input
                id="title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="cth: Frontend Developer"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="division" className="block text-sm font-medium text-gray-300">
                Devisi
              </label>
              <input
                id="division"
                type="text"
                required
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                placeholder="cth: Engineering"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="minSalary" className="block text-sm font-medium text-gray-300">
                  Gaji Minimum
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                  <input
                    id="minSalary"
                    type="number"
                    step="any"
                    required
                    value={minSalary}
                    onChange={(e) => setMinSalary(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-300">
                  Gaji Maksimal
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                  <input
                    id="maxSalary"
                    type="number"
                    step="any"
                    required
                    value={maxSalary}
                    onChange={(e) => setMaxSalary(e.target.value)}
                    className="w-full rounded-lg border border-white/10 bg-white/5 pl-10 pr-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="imageInput" className="block text-sm font-medium text-gray-300">
                Gambaran Gawe (URL Gambar Terpilih)
              </label>
              <input
                id="imageInput"
                type="text"
                value={image}
                onChange={(e) => handleImageUrlChange(e.target.value)}
                placeholder="Otomatis terisi dari tab unggahan di bawah atau isi URL manual"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors text-xs truncate"
              />

              {/* Form Active Image Live Status/Preview Container */}
              {image && (
                <div className="mt-2 rounded-xl border border-white/5 bg-slate-950/40 p-2 flex items-center gap-3 animate-in fade-in duration-300">
                  <div 
                    className="h-12 w-12 rounded-lg bg-cover bg-center shrink-0 border border-white/10 cursor-zoom-in"
                    style={{ backgroundImage: `url(${image})` }}
                    onClick={() => setPreviewImage(image)}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-indigo-400 truncate">Preview Gambar Terintegrasi</p>
                    <button 
                      type="button" 
                      onClick={() => setImage('')} 
                      className="text-[10px] text-red-400 hover:underline block mt-0.5"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 ">
              <div className="flex rounded-full border border-white/10 bg-[#0f1117] p-1 ">
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
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#0f1117] p-4 text-center">
                  <p className="text-xs font-semibold text-white mb-2">Tempel Link Google Drive Anda</p>
                  <input
                    type="text"
                    value={driveLinkInput}
                    onChange={(e) => {
                      setDriveLinkInput(e.target.value)
                      handleImageUrlChange(e.target.value)
                    }}
                    placeholder="Tempel link share file drive..."
                    className="w-full mb-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
                  />
                  <div className="border-t border-white/5 pt-3">
                    <p className="text-[11px] text-slate-400 mb-2">Atau cari berkas langsung di manager penyimpanan cloud:</p>
                    <button
                      type="button"
                      onClick={() => window.open('https://drive.google.com/drive/my-drive', '_blank')}
                      className="inline-flex items-center justify-center rounded-lg bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-indigo-600 transition-all active:scale-[0.98]"
                    >
                      Buka Google Drive
                    </button>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <label className="block text-xs text-slate-400">Unggah berkas lokal gambar</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLocalFileChange}
                    className="w-full rounded-xl border border-white/10 bg-slate-900/50 px-4 py-3 text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                  />
                  {uploadedFiles.length > 0 && (
                    <div className="space-y-2 rounded-xl border border-white/10 bg-slate-950/80 p-3 max-h-32 overflow-y-auto custom-scrollbar">
                      {uploadedFiles.map((file) => (
                        <div key={file.name} className="flex items-center justify-between gap-2 rounded-lg bg-slate-900 px-3 py-2">
                          <span className="truncate text-xs text-white">{file.name}</span>
                          <span className="text-[10px] text-slate-400 shrink-0">{(file.size / 1024).toFixed(0)} KB</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                Deskripsi Gawe
              </label>
              <textarea
                id="description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Jelaskan tanggung jawab utama..."
                className="w-full h-32 resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors custom-scrollbar"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="requirements" className="block text-sm font-medium text-gray-300">
                Persyaratan Khusus
              </label>
              <textarea
                id="requirements"
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Contoh: usia, gender, pengalaman, kualifikasi lain..."
                className="w-full h-28 resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-colors custom-scrollbar"
              />
              <p className="text-xs text-gray-500">Pesan ini akan ditampilkan ke pelamar saat menekan tombol Apply.</p>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                type="submit"
                className="w-full rounded-lg bg-indigo-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:bg-indigo-600 hover:shadow-indigo-500/40 active:scale-[0.98]"
              >
                {editingId ? 'Simpan Perubahan' : 'Buat Lowongan'}
              </button>
            </div>
            
          </form>
        </SheetContent>
      </Sheet>

      {/* Large Lightbox Zoom Preview Modal */}
      {previewImage && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity cursor-zoom-out" 
            onClick={() => setPreviewImage(null)} 
          />
          
          <div className="relative max-w-3xl max-h-[85vh] transform overflow-hidden rounded-2xl border border-white/10 bg-[#161b22] p-2 shadow-2xl transition-all animate-in zoom-in-95 fade-in duration-200">
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/60 p-2 text-gray-400 hover:text-white backdrop-blur-sm transition-colors"
              title="Tutup Pratinjau"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
            <img 
              src={previewImage} 
              alt="Pratinjau Besar" 
              className="max-w-full max-h-[80vh] rounded-xl object-contain mx-auto"
            />
          </div>
        </div>
      )}

      {/* Custom Delete Confirmation Modal */}
      {deleteDialog.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={closeDeleteModal} 
          />
          
          <div className="relative transform overflow-hidden rounded-xl bg-[#161b22] border border-white/10 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in zoom-in-95 fade-in duration-200">
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-500/10 sm:mx-0 sm:h-10 sm:w-10">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-white">
                    Hapus Lowongan
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Apakah Anda yakin ingin menghapus lowongan <strong className="text-white">{jobs.find(j => j.id === deleteDialog.jobId)?.title}</strong>? Data ini akan dihapus secara permanen dan tidak dapat dikembalikan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400 shadow-red-500/20 sm:ml-3 sm:w-auto active:scale-95 transition-all"
                onClick={confirmDelete}
              >
                Ya, Hapus
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 border border-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 sm:mt-0 sm:w-auto transition-colors"
                onClick={closeDeleteModal}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Logout Confirmation Modal */}
      {logoutDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setLogoutDialog(false)} 
          />
          
          <div className="relative transform overflow-hidden rounded-xl bg-[#161b22] border border-white/10 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in zoom-in-95 fade-in duration-200">
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-500/10 sm:mx-0 sm:h-10 sm:w-10">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-indigo-400" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-white">
                    Konfirmasi Keluar
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Apakah Anda yakin ingin keluar dari sesi admin? Anda harus masuk kembali untuk mengelola data pekerjaan dan pelamar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 shadow-indigo-500/20 sm:ml-3 sm:w-auto active:scale-95 transition-all"
                onClick={confirmLogout}
              >
                Ya, Keluar
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 border border-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 sm:mt-0 sm:w-auto transition-colors"
                onClick={() => setLogoutDialog(false)}
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}