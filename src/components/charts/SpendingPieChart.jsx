import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatCurrency } from '@/utils/formatters'
import { CATEGORY_COLORS } from '@/data/mockTransactions'

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value } = payload[0].payload
    return (
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-md)',
      }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{name}</p>
        <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {formatCurrency(value)}
        </p>
      </div>
    )
  }
  return null
}

const renderLegend = (props) => {
  const { payload } = props
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
      {payload.map((entry) => (
        <div key={entry.value} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SpendingPieChart({ data }) {
  const top6 = data.slice(0, 6)
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={top6}
          cx="50%"
          cy="45%"
          innerRadius={55}
          outerRadius={85}
          paddingAngle={3}
          dataKey="total"
          nameKey="category"
          animationBegin={0}
          animationDuration={1000}
        >
          {top6.map((entry) => (
            <Cell
              key={entry.category}
              fill={CATEGORY_COLORS[entry.category] || '#6366f1'}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={renderLegend} />
      </PieChart>
    </ResponsiveContainer>
  )
}
