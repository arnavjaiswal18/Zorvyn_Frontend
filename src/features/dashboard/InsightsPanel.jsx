import { useAnalytics } from '@/hooks/useAnalytics'
import { formatCurrency } from '@/utils/formatters'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/data/mockTransactions'
import { TrendingUp, Award, BarChart2 } from 'lucide-react'

export default function InsightsPanel() {
  const { categoryTotals, highestCategory, summary } = useAnalytics()

  const total = categoryTotals.reduce((s, c) => s + c.total, 0)
  const top3 = categoryTotals.slice(0, 5)

  return (
    <div className="chart-card">
      <div className="section-header">
        <div>
          <div className="section-title">Spending Breakdown</div>
          <div className="section-subtitle">Top categories this month</div>
        </div>
        {highestCategory && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Award size={14} color="var(--color-warning)" />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Highest: <strong style={{ color: 'var(--text-primary)' }}>{highestCategory.category}</strong>
            </span>
          </div>
        )}
      </div>

      {top3.length === 0 ? (
        <div className="empty-state" style={{ padding: '2rem' }}>
          <div className="empty-state-icon">📊</div>
          <div className="empty-state-title">No spending data</div>
        </div>
      ) : (
        <div className="category-bar-wrap">
          {top3.map(({ category, total: amt }) => {
            const pct = total > 0 ? (amt / total) * 100 : 0
            const color = CATEGORY_COLORS[category] || '#6366f1'
            return (
              <div className="category-bar-item" key={category}>
                <div className="category-bar-header">
                  <span className="category-bar-label">
                    <span>{CATEGORY_ICONS[category] || '💳'}</span>
                    {category}
                  </span>
                  <span className="category-bar-amount">{formatCurrency(amt)}</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
