import SummaryCards from './SummaryCards'
import RecentTransactions from './RecentTransactions'
import InsightsPanel from './InsightsPanel'
import BalanceTrendChart from '@/components/charts/BalanceTrendChart'
import SpendingPieChart from '@/components/charts/SpendingPieChart'
import { useAnalytics } from '@/hooks/useAnalytics'

export default function DashboardPage() {
  const { runningBalance, categoryTotals } = useAnalytics()

  return (
    <div>
      {/* Page Header */}
      <div style={{ marginBottom: 'var(--space-8)' }}>
        <h1 className="page-title">Financial Overview</h1>
        <p className="page-subtitle">Welcome back! Here's your summary.</p>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts */}
      <div className="charts-grid">
        <div className="chart-card">
          <div className="chart-title">Balance Trend</div>
          <div className="chart-subtitle">Running balance over time</div>
          <BalanceTrendChart data={runningBalance} />
        </div>

        <div className="chart-card">
          <div className="chart-title">Spending by Category</div>
          <div className="chart-subtitle">All-time expense breakdown</div>
          <SpendingPieChart data={categoryTotals} />
        </div>
      </div>

      {/* Recent & Insights side by side */}
      <div className="dashboard-bottom">
        <RecentTransactions />
        <InsightsPanel />
      </div>
    </div>
  )
}
