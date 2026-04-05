import { useAnalytics } from '@/hooks/useAnalytics'
import MonthlyBarChart from '@/components/charts/MonthlyBarChart'
import { formatCurrency, formatMonth } from '@/utils/formatters'
import { CATEGORY_COLORS, CATEGORY_ICONS } from '@/data/mockTransactions'
import { TrendingUp, TrendingDown, Award, PiggyBank, Zap } from 'lucide-react'

export default function InsightsPage() {
  const { categoryTotals, monthlyTotals, highestCategory, summary } = useAnalytics()

  const totalExpenses = categoryTotals.reduce((s, c) => s + c.total, 0)
  const last2 = monthlyTotals.slice(-2)
  const prevMonth = last2[0]
  const currMonth = last2[1]

  const momExpChange = prevMonth && currMonth
    ? ((currMonth.expenses - prevMonth.expenses) / prevMonth.expenses) * 100
    : 0

  const momIncChange = prevMonth && currMonth
    ? ((currMonth.income - prevMonth.income) / prevMonth.income) * 100
    : 0

  return (
    <div>
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="page-title">Financial Insights</h1>
        <p className="page-subtitle">Understand your money patterns at a glance</p>
      </div>

      {/* KPI Summary Row */}
      <div className="insights-grid">
        <div className="insight-card">
          <div className="insight-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Award size={13} color="var(--color-warning)" /> Top Spending Category
          </div>
          <div className="insight-value">
            {highestCategory ? (
              <>
                <span style={{ marginRight: 6 }}>{CATEGORY_ICONS[highestCategory.category]}</span>
                {highestCategory.category}
              </>
            ) : '—'}
          </div>
          {highestCategory && (
            <div className="insight-detail">
              {formatCurrency(highestCategory.total)} spent all-time
            </div>
          )}
        </div>

        <div className="insight-card">
          <div className="insight-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <PiggyBank size={13} color="var(--color-success)" /> Monthly Savings Rate
          </div>
          <div className="insight-value" style={{ color: summary.savingsRate >= 20 ? 'var(--color-success)' : summary.savingsRate < 0 ? 'var(--color-danger)' : 'var(--text-primary)' }}>
            {summary.savingsRate.toFixed(1)}%
          </div>
          <div className="insight-detail">
            {summary.savingsRate >= 20 ? '✅ Healthy savings rate' : summary.savingsRate < 0 ? '⚠️ Spending exceeds income' : '📊 Below recommended 20%'}
          </div>
        </div>

        <div className="insight-card">
          <div className="insight-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={13} color="var(--accent-light)" /> Expense vs Last Month
          </div>
          <div className="insight-value" style={{ color: momExpChange > 0 ? 'var(--color-danger)' : 'var(--color-success)', display: 'flex', alignItems: 'center', gap: 6 }}>
            {momExpChange > 0 ? <TrendingUp size={22} /> : <TrendingDown size={22} />}
            {Math.abs(momExpChange).toFixed(1)}%
          </div>
          <div className="insight-detail">
            {momExpChange > 0 ? 'Up' : 'Down'} vs previous month · {currMonth ? formatCurrency(currMonth.expenses) : '—'}
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="chart-card" style={{ marginBottom: 'var(--space-8)' }}>
        <div className="chart-title">Income vs Expenses — Monthly Comparison</div>
        <div className="chart-subtitle">Last 6 months side-by-side</div>
        <MonthlyBarChart data={monthlyTotals} />
      </div>

      {/* Category Breakdown Table */}
      <div className="chart-card">
        <div className="chart-title" style={{ marginBottom: 'var(--space-5)' }}>Category Breakdown</div>
        {categoryTotals.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📊</div>
            <div className="empty-state-title">No spending data yet</div>
          </div>
        ) : (
          <div className="table-container" style={{ boxShadow: 'none', border: '1px solid var(--border)' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Total Spend</th>
                  <th>% of Expenses</th>
                  <th style={{ minWidth: 180 }}>Breakdown</th>
                </tr>
              </thead>
              <tbody>
                {categoryTotals.map(({ category, total }) => {
                  const pct = totalExpenses > 0 ? (total / totalExpenses) * 100 : 0
                  const color = CATEGORY_COLORS[category] || '#6366f1'
                  return (
                    <tr key={category}>
                      <td>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{CATEGORY_ICONS[category] || '💳'}</span>
                          <span style={{ fontWeight: 600 }}>{category}</span>
                        </span>
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(total)}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{pct.toFixed(1)}%</td>
                      <td>
                        <div className="progress-track">
                          <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Month-over-Month Table */}
      {last2.length === 2 && (
        <div className="chart-card" style={{ marginTop: 'var(--space-5)' }}>
          <div className="chart-title" style={{ marginBottom: 'var(--space-5)' }}>Month-over-Month Comparison</div>
          <div className="table-container" style={{ boxShadow: 'none', border: '1px solid var(--border)' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>{formatMonth(prevMonth.month + '-01')}</th>
                  <th>{formatMonth(currMonth.month + '-01')}</th>
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Income</td>
                  <td>{formatCurrency(prevMonth.income)}</td>
                  <td>{formatCurrency(currMonth.income)}</td>
                  <td>
                    <span style={{ color: momIncChange >= 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
                      {momIncChange >= 0 ? '↑' : '↓'} {Math.abs(momIncChange).toFixed(1)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Expenses</td>
                  <td>{formatCurrency(prevMonth.expenses)}</td>
                  <td>{formatCurrency(currMonth.expenses)}</td>
                  <td>
                    <span style={{ color: momExpChange <= 0 ? 'var(--color-success)' : 'var(--color-danger)', fontWeight: 600 }}>
                      {momExpChange >= 0 ? '↑' : '↓'} {Math.abs(momExpChange).toFixed(1)}%
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Net Savings</td>
                  <td>{formatCurrency(prevMonth.income - prevMonth.expenses)}</td>
                  <td>{formatCurrency(currMonth.income - currMonth.expenses)}</td>
                  <td>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>—</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
