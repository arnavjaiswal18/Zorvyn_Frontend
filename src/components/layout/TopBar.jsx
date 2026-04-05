import { useLocation } from 'react-router-dom'
import { Sun, Moon, Menu } from 'lucide-react'
import { useUIStore } from '@/store/ui.store'
import RoleSwitcher from '@/features/auth/RoleSwitcher'

const PAGE_TITLES = {
  '/':             { title: 'Dashboard',    subtitle: 'Welcome back, Alex 👋' },
  '/transactions': { title: 'Transactions', subtitle: 'Manage and review your transactions' },
  '/insights':     { title: 'Insights',     subtitle: 'Understand your spending patterns' },
}

export default function TopBar() {
  const { pathname } = useLocation()
  const { theme, toggleTheme, toggleSidebar } = useUIStore()

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button className="btn btn-ghost btn-icon" onClick={toggleSidebar} title="Toggle sidebar">
          <Menu size={20} />
        </button>
      </div>
      <div className="topbar-right">
        <RoleSwitcher />
        <div className="filter-divider" />
        <button className="btn btn-ghost btn-icon" onClick={toggleTheme} title="Toggle theme">
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  )
}
