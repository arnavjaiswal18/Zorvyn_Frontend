import { parseISO, format, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns'

export const groupBy = (arr, keyFn) =>
  arr.reduce((acc, item) => {
    const key = keyFn(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {})

export const sumBy = (arr, keyFn) => arr.reduce((sum, item) => sum + keyFn(item), 0)

export const getMonthlyTotals = (transactions) => {
  const monthly = {}
  transactions.forEach((tx) => {
    const monthKey = format(parseISO(tx.date), 'yyyy-MM')
    if (!monthly[monthKey]) monthly[monthKey] = { month: monthKey, income: 0, expenses: 0 }
    if (tx.type === 'income') monthly[monthKey].income += tx.amount
    else monthly[monthKey].expenses += tx.amount
  })
  return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month))
}

export const getCategoryTotals = (transactions) => {
  const byCategory = groupBy(
    transactions.filter((tx) => tx.type === 'expense'),
    (tx) => tx.category
  )
  return Object.entries(byCategory)
    .map(([category, txs]) => ({ category, total: sumBy(txs, (tx) => tx.amount) }))
    .sort((a, b) => b.total - a.total)
}

export const getThisMonthTransactions = (transactions) => {
  const now = new Date()
  const start = startOfMonth(now)
  const end = endOfMonth(now)
  return transactions.filter((tx) => {
    try { return isWithinInterval(parseISO(tx.date), { start, end }) } catch { return false }
  })
}

export const getLastMonthTransactions = (transactions) => {
  const now = new Date()
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
  const start = startOfMonth(lastMonth)
  const end = endOfMonth(lastMonth)
  return transactions.filter((tx) => {
    try { return isWithinInterval(parseISO(tx.date), { start, end }) } catch { return false }
  })
}

export const computeSummary = (transactions) => {
  const thisMonth = getThisMonthTransactions(transactions)
  const lastMonth = getLastMonthTransactions(transactions)

  const monthIncome  = sumBy(thisMonth.filter((t) => t.type === 'income'),  (t) => t.amount)
  const monthExpense = sumBy(thisMonth.filter((t) => t.type === 'expense'), (t) => t.amount)
  const lastIncome   = sumBy(lastMonth.filter((t) => t.type === 'income'),  (t) => t.amount)
  const lastExpense  = sumBy(lastMonth.filter((t) => t.type === 'expense'), (t) => t.amount)

  const totalIncome  = sumBy(transactions.filter((t) => t.type === 'income'),  (t) => t.amount)
  const totalExpense = sumBy(transactions.filter((t) => t.type === 'expense'), (t) => t.amount)
  const totalBalance = totalIncome - totalExpense

  const savingsRate = monthIncome > 0 ? ((monthIncome - monthExpense) / monthIncome) * 100 : 0

  const incomeChange  = lastIncome  > 0 ? ((monthIncome  - lastIncome)  / lastIncome)  * 100 : 0
  const expenseChange = lastExpense > 0 ? ((monthExpense - lastExpense) / lastExpense) * 100 : 0

  return { totalBalance, monthIncome, monthExpense, savingsRate, incomeChange, expenseChange }
}

export const getRunningBalance = (transactions) => {
  const monthly = getMonthlyTotals(transactions)
  let running = 0
  return monthly.map((m) => {
    running += m.income - m.expenses
    return { ...m, balance: running }
  })
}
