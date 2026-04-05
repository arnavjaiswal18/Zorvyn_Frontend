import { Shield, Eye, ChevronDown } from 'lucide-react'
import { useFinanceStore } from '@/store/finance.store'

export default function RoleSwitcher() {
  const { role, setRole } = useFinanceStore()

  const handleChange = (e) => setRole(e.target.value)

  return (
    <div className="role-switcher">
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: role === 'admin' ? 'var(--accent-light)' : 'var(--color-warning)' }}>
          {role === 'admin' ? <Shield size={14} /> : <Eye size={14} />}
        </div>
        <select
          className="form-select"
          value={role}
          onChange={handleChange}
          style={{ height: '36px', padding: '0 32px 0 34px', fontSize: '0.85rem', minWidth: 140, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.03)' }}
          title="Switch role"
          id="role-switcher-select"
        >
          <option value="admin">Admin Access</option>
          <option value="viewer">Viewer Only</option>
        </select>
      </div>
    </div>
  )
}
