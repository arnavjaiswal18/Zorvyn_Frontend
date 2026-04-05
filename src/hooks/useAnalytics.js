import { useMemo } from 'react'
import { useFinanceStore } from '@/store/finance.store'
import {
  computeSummary,
  getCategoryTotals,
  getMonthlyTotals,
  getRunningBalance,
  getThisMonthTransactions,
} from '@/utils/analytics'

export const useAnalytics = () => {
  const transactions = useFinanceStore((s) => s.transactions)

  return useMemo(() => {
    const summary = computeSummary(transactions)
    const categoryTotals = getCategoryTotals(transactions)
    const monthlyTotals = getMonthlyTotals(transactions)
    const runningBalance = getRunningBalance(transactions)
    const thisMonth = getThisMonthTransactions(transactions)
    const recent = [...transactions]
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 5)
    const highestCategory = categoryTotals[0] || null

    return {
      summary,
      categoryTotals,
      monthlyTotals,
      runningBalance,
      thisMonth,
      recent,
      highestCategory,
    }
  }, [transactions])
}
