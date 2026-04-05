import { format, parseISO } from 'date-fns'

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount)

export const formatDate = (dateStr) => {
  try { return format(parseISO(dateStr), 'MMM dd, yyyy') } catch { return dateStr }
}

export const formatShortDate = (dateStr) => {
  try { return format(parseISO(dateStr), 'MMM dd') } catch { return dateStr }
}

export const formatMonth = (dateStr) => {
  try { return format(parseISO(dateStr), 'MMM yyyy') } catch { return dateStr }
}

export const formatPercent = (value) => `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`

export const formatCompactCurrency = (amount) => {
  if (Math.abs(amount) >= 1000) {
    return `$${(amount / 1000).toFixed(1)}k`
  }
  return formatCurrency(amount)
}
