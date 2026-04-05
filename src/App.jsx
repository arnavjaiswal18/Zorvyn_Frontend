import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useUIStore } from '@/store/ui.store'
import Sidebar from '@/components/layout/Sidebar'
import TopBar from '@/components/layout/TopBar'
import DashboardPage from '@/features/dashboard/DashboardPage'
import TransactionsPage from '@/features/transactions/TransactionsPage'
import InsightsPage from '@/features/dashboard/InsightsPage'
import '@/styles/global.css'

export default function App() {
  const theme = useUIStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <TopBar />
          <main className="page-content">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}
