import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts'
import { format, parseISO } from 'date-fns'
import { formatCompactCurrency, formatCurrency } from '@/utils/formatters'

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-md)',
        padding: '10px 14px',
        boxShadow: 'var(--shadow-md)',
        minWidth: 140,
      }}>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ fontSize: '0.8rem', fontWeight: 600, color: p.fill, marginBottom: 2 }}>
            {p.name}: {formatCurrency(p.value)}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function MonthlyBarChart({ data }) {
  const last6 = data.slice(-6).map((d) => ({
    ...d,
    monthLabel: format(parseISO(d.month + '-01'), 'MMM'),
  }))

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={last6} margin={{ top: 8, right: 8, left: 0, bottom: 0 }} barCategoryGap="30%">
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis
          dataKey="monthLabel"
          tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
          axisLine={false}
          tickLine={false}
          tickFormatter={formatCompactCurrency}
          width={52}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: '0.75rem', color: 'var(--text-secondary)', paddingTop: 12 }}
        />
        <Bar dataKey="income"   name="Income"   fill="#6366f1" radius={[4, 4, 0, 0]} animationDuration={1000} />
        <Bar dataKey="expenses" name="Expenses" fill="#f97316" radius={[4, 4, 0, 0]} animationDuration={1200} />
      </BarChart>
    </ResponsiveContainer>
  )
}
