'use client'

import { useState, Fragment } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { 
  Bars3Icon, 
  ArrowTopRightOnSquareIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightOnRectangleIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'

const navigation = [
  { name: 'Pelamar', href: '/admin' },
  { name: 'Gawe', href: '/admin/jobs' },
]

// Expanded mock data to clearly showcase the sorting features
const applicantsData = [
  {
    divisi: 'Slate Motors',
    applicants: [
      { id: 1, name: 'Lindsay Walton', job: 'Frontend Developer', domisili: 'Jakarta Selatan', pendidikan: 'Gelar Sarjana', driveUrl: '#', tglLamar: '2026-06-01' },
    ],
  },
]

type Applicant = typeof applicantsData[0]['applicants'][0]
type SortOption = 'name-asc' | 'name-desc' | 'date-desc' | 'date-asc'

export default function AdminPage() {
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  // Sorting State
  const [sortBy, setSortBy] = useState<SortOption>('date-desc')
  
  // Custom Confirmation Modal State
  const [dialogConfig, setDialogConfig] = useState<{
    isOpen: boolean;
    type: 'approve' | 'reject' | null;
    applicant: Applicant | null;
  }>({ isOpen: false, type: null, applicant: null })

  const [logoutDialog, setLogoutDialog] = useState(false)

  // Sort Engine logic applied inline before rendering
  const processedData = applicantsData.map((division) => {
    const sortedApplicants = [...division.applicants].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name)
        case 'name-desc':
          return b.name.localeCompare(a.name)
        case 'date-asc':
          return new Date(a.tglLamar).getTime() - new Date(b.tglLamar).getTime()
        case 'date-desc':
          return new Date(b.tglLamar).getTime() - new Date(a.tglLamar).getTime()
        default:
          return 0
      }
    })
    return { ...division, applicants: sortedApplicants }
  })

  const requestAction = (type: 'approve' | 'reject', applicant: Applicant) => {
    setDialogConfig({ isOpen: true, type, applicant })
  }

  const handleConfirmAction = () => {
    const { type, applicant } = dialogConfig
    if (!applicant) return

    if (type === 'approve') {
      toast.success('Pelamar disetujui!', {
        description: `${applicant.name} telah disetujui untuk posisi ${applicant.job}.`,
        duration: 5000,
      })
    } else if (type === 'reject') {
      toast.error('Pelamar ditolak!', {
        description: `${applicant.name} telah ditolak untuk posisi ${applicant.job}.`,
        duration: 5000,
      })
    }

    setDialogConfig({ isOpen: false, type: null, applicant: null })
  }

  const closeModal = () => {
    setDialogConfig({ isOpen: false, type: null, applicant: null })
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
                className={`text-sm font-semibold transition-colors ${item.name === 'Pelamar' ? 'text-indigo-400' : 'text-white hover:text-indigo-400'}`}
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

          <div className="flex lg:hidden">
            <button onClick={() => setMobileMenuOpen(true)} className="p-2.5 text-white">
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

      {/* Main Content Area */}
      <main className="relative isolate pt-24 px-6 lg:px-8 max-w-[90rem] mx-auto pb-20">
        
        {/* Header Section */}
        <div className="sm:flex sm:items-center justify-between mt-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-bold leading-6 text-white">Data Pelamar</h1>
            <p className="mt-2 text-sm text-gray-400 max-w-2xl">
              Daftar seluruh pelamar beserta posisi yang dilamar, divisi, domisili, pendidikan terakhir, dan tautan dokumen mereka.
            </p>
          </div>
          
          {/* Controls Container (Sorting + Export Actions) */}
          <div className="mt-4 sm:mt-0 flex flex-wrap items-center gap-4 sm:ml-16 sm:flex-none">
            
            {/* Styled Sort Selector */}
            <div className="relative flex items-center bg-white/5 border border-white/10 rounded-md px-3 py-2 text-sm transition-colors hover:bg-white/10 group">
              <label htmlFor="sort-select" className="text-gray-400 mr-2 text-xs font-medium uppercase tracking-wider">
                Urutkan:
              </label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-white font-medium focus:outline-none pr-6 cursor-pointer appearance-none text-sm"
              >
                <option value="date-desc" className="bg-[#161b22] text-white">Tanggal: Terbaru</option>
                <option value="date-asc" className="bg-[#161b22] text-white">Tanggal: Terlama</option>
                <option value="name-asc" className="bg-[#161b22] text-white">Nama: A - Z</option>
                <option value="name-desc" className="bg-[#161b22] text-white">Nama: Z - A</option>
              </select>
              <ChevronDownIcon className="absolute right-3 w-4 h-4 text-gray-400 pointer-events-none group-hover:text-white transition-colors" />
            </div>

            <button
              type="button"
              className="block rounded-md bg-white/10 border border-white/10 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-white/20 transition-colors active:scale-95"
            >
              Export CSV
            </button>
          </div>
        </div>

        {/* Grouped Table Section */}
        <div className="mt-8 flow-root rounded-xl border border-white/10 bg-[#161b22] shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both overflow-hidden">
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full align-middle">
              <table className="min-w-full text-left">
                <thead className="border-b border-white/10 bg-white/5">
                  <tr>
                    <th scope="col" className="py-4 pl-6 pr-3 text-sm font-semibold text-white">Nama Pelamar</th>
                    <th scope="col" className="px-3 py-4 text-sm font-semibold text-white">Nama Gawe</th>
                    <th scope="col" className="px-3 py-4 text-sm font-semibold text-white">Domisili</th>
                    <th scope="col" className="px-3 py-4 text-sm font-semibold text-white">Pendidikan Terakhir</th>
                    <th scope="col" className="px-3 py-4 text-sm font-semibold text-white">Tanggal Lamar</th>
                    <th scope="col" className="py-4 pl-3 pr-6 text-right text-sm font-semibold text-white">Aksi & Keputusan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {processedData.map((division) => (
                    <Fragment key={division.divisi}>
                      {/* Division Group Header */}
                      <tr className="bg-white/[0.02]">
                        <th
                          colSpan={6}
                          scope="colgroup"
                          className="py-3 pl-6 pr-3 text-sm font-bold text-indigo-400"
                        >
                          {division.divisi}
                        </th>
                      </tr>
                      {/* Sorted Applicants Rows */}
                      {division.applicants.map((applicant) => (
                        <tr key={applicant.id} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-white">
                            {applicant.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                            {applicant.job}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                            {applicant.domisili}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                            {applicant.pendidikan}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                            {applicant.tglLamar}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-6 text-right text-sm font-medium">
                            <div className="flex items-center justify-end gap-4">
                              <a
                                href={applicant.driveUrl}
                                className="inline-flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <span>Dokumen</span>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                              </a>
                              
                              <div className="h-4 w-px bg-white/10" aria-hidden="true" />
                              
                              <button
                                type="button"
                                onClick={() => requestAction('approve', applicant)}
                                className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 px-2.5 py-1.5 text-xs font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-white transition-colors"
                              >
                                <CheckCircleIcon className="h-4 w-4" />
                                Approve
                              </button>
                              <button
                                type="button"
                                onClick={() => requestAction('reject', applicant)}
                                className="inline-flex items-center gap-1 rounded-md bg-red-500/10 px-2.5 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                              >
                                <XCircleIcon className="h-4 w-4" />
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </main>

      {/* Custom Confirmation Modal */}
      {dialogConfig.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-0">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeModal} />
          
          <div className="relative transform overflow-hidden rounded-xl bg-[#161b22] border border-white/10 text-left shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg animate-in zoom-in-95 fade-in duration-200">
            <div className="px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                  dialogConfig.type === 'approve' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                }`}>
                  {dialogConfig.type === 'approve' ? (
                    <CheckCircleIcon className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <ExclamationTriangleIcon className="h-6 w-6" aria-hidden="true" />
                  )}
                </div>
                
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-lg font-semibold leading-6 text-white" id="modal-title">
                    {dialogConfig.type === 'approve' ? 'Konfirmasi Persetujuan' : 'Konfirmasi Penolakan'}
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      Apakah Anda yakin ingin {dialogConfig.type === 'approve' ? 'menyetujui' : 'menolak'} lamaran dari <strong className="text-white">{dialogConfig.applicant?.name}</strong> untuk posisi <strong className="text-white">{dialogConfig.applicant?.job}</strong>?
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto active:scale-95 transition-all ${
                  dialogConfig.type === 'approve' 
                  ? 'bg-emerald-500 hover:bg-emerald-400 shadow-emerald-500/20' 
                  : 'bg-red-500 hover:bg-red-400 shadow-red-500/20'
                }`}
                onClick={handleConfirmAction}
              >
                Ya, {dialogConfig.type === 'approve' ? 'Setujui' : 'Tolak'}
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white/10 border border-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20 sm:mt-0 sm:w-auto transition-colors"
                onClick={closeModal}
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