import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { formatCurrency, formatShortDate } from '@/utils/formatters'
import { CATEGORY_ICONS, CATEGORY_COLORS } from '@/data/mockTransactions'

export default function RecentTransactions() {
  const { recent } = useAnalytics()

  return (
    <div className="chart-card">
      <div className="section-header">
        <div>
          <div className="section-title">Recent Transactions</div>
          <div className="section-subtitle">Your latest activity</div>
        </div>
        <Link to="/transactions" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          View all <ArrowRight size={14} />
        </Link>
      </div>

      {recent.length === 0 ? (
        <div className="empty-state" style={{ padding: '2rem' }}>
          <div className="empty-state-icon">📭</div>
          <div className="empty-state-title">No transactions yet</div>
        </div>
      ) : (
        <div className="recent-tx-list">
          {recent.map((tx) => (
            <div className="recent-tx-item" key={tx.id}>
              <div className="recent-tx-icon">{CATEGORY_ICONS[tx.category] || '💳'}</div>
              <div className="recent-tx-info">
                <div className="recent-tx-desc">{tx.description}</div>
                <div className="recent-tx-date">{tx.category} · {formatShortDate(tx.date)}</div>
              </div>
              <div style={{
                fontWeight: 700,
                fontSize: '0.9rem',
                color: tx.type === 'income' ? 'var(--color-success)' : 'var(--text-primary)',
                flexShrink: 0,
              }}>
                {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
