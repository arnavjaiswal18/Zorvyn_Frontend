import { TrendingUp, TrendingDown, Wallet, ArrowUpCircle, ArrowDownCircle, PiggyBank } from 'lucide-react'
import { useAnalytics } from '@/hooks/useAnalytics'
import { formatCurrency, formatPercent } from '@/utils/formatters'

const CARDS = [
  {
    key: 'balance',
    label: 'Total Balance',
    icon: Wallet,
    iconBg: 'rgba(99,102,241,0.15)',
    iconColor: '#818cf8',
    getValue: (s) => s.totalBalance,
    getChange: () => null,
    changeLabel: 'All time net',
  },
  {
    key: 'income',
    label: 'Monthly Income',
    icon: ArrowUpCircle,
    iconBg: 'rgba(34,197,94,0.15)',
    iconColor: '#22c55e',
    getValue: (s) => s.monthIncome,
    getChange: (s) => s.incomeChange,
    changeLabel: 'vs last month',
  },
  {
    key: 'expenses',
    label: 'Monthly Expenses',
    icon: ArrowDownCircle,
    iconBg: 'rgba(239,68,68,0.15)',
    iconColor: '#ef4444',
    getValue: (s) => s.monthExpense,
    getChange: (s) => s.expenseChange,
    changeLabel: 'vs last month',
    invertChange: true,
  },
  {
    key: 'savings',
    label: 'Savings Rate',
    icon: PiggyBank,
    iconBg: 'rgba(245,158,11,0.15)',
    iconColor: '#f59e0b',
    getValue: (s) => s.savingsRate,
    getChange: () => null,
    changeLabel: 'of monthly income',
    isPercent: true,
  },
]

export default function SummaryCards() {
  const { summary } = useAnalytics()

  return (
    <div className="summary-cards-grid">
      {CARDS.map(({ key, label, icon: Icon, iconBg, iconColor, getValue, getChange, changeLabel, invertChange, isPercent }) => {
        const value  = getValue(summary)
        const change = getChange(summary)
        const isPositive = invertChange ? change < 0 : change > 0
        const isNegative = invertChange ? change > 0 : change < 0

        return (
          <div className="summary-card" key={key}>
            <div className="summary-card-header">
              <span className="summary-card-label">{label}</span>
              <div className="summary-card-icon" style={{ background: iconBg }}>
                <Icon size={20} color={iconColor} />
              </div>
            </div>

            <div className="summary-card-value">
              {isPercent ? `${value.toFixed(1)}%` : formatCurrency(value)}
            </div>

            <div className="summary-card-change">
              {change !== null ? (
                <>
                  {isPositive && <TrendingUp size={13} />}
                  {isNegative && <TrendingDown size={13} />}
                  <span className={isPositive ? 'change-positive' : isNegative ? 'change-negative' : 'change-neutral'}>
                    {change !== 0 ? formatPercent(change) : '—'} {changeLabel}
                  </span>
                </>
              ) : (
                <span className="change-neutral">{changeLabel}</span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
