import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Receipt, Lightbulb, PanelLeftClose, PanelLeftOpen,
  TrendingUp,
} from 'lucide-react'
import { useUIStore } from '@/store/ui.store'

const NAV_ITEMS = [
  { to: '/',             icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/transactions', icon: Receipt,         label: 'Transactions' },
  { to: '/insights',     icon: Lightbulb,       label: 'Insights' },
]

export default function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useUIStore()

  return (
    <aside className={`sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <TrendingUp size={20} color="#fff" />
        </div>
        {sidebarOpen && (
          <span className="sidebar-logo-text">
            Zor<span>vyn</span>
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="sidebar-nav">
        {sidebarOpen && <span className="nav-section-label">Menu</span>}
        {NAV_ITEMS.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            title={!sidebarOpen ? label : undefined}
          >
            <span className="nav-item-icon">
              <Icon size={18} />
            </span>
            {sidebarOpen && label}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="sidebar-footer">
        <button className="sidebar-toggle-btn" onClick={toggleSidebar} title="Toggle sidebar">
          <span className="nav-item-icon">
            {sidebarOpen
              ? <PanelLeftClose size={18} />
              : <PanelLeftOpen  size={18} />}
          </span>
          {sidebarOpen && 'Collapse'}
        </button>
      </div>
    </aside>
  )
}
