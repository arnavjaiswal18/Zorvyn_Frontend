import { useMemo } from 'react'
import { parseISO, isWithinInterval } from 'date-fns'
import { useFinanceStore } from '@/store/finance.store'

export const useFilteredTransactions = () => {
  const transactions = useFinanceStore((s) => s.transactions)
  const filters = useFinanceStore((s) => s.filters)

  return useMemo(() => {
    let result = [...transactions]

    if (filters.search) {
      const q = filters.search.toLowerCase()
      result = result.filter(
        (tx) =>
          tx.description.toLowerCase().includes(q) ||
          tx.category.toLowerCase().includes(q) ||
          (tx.note && tx.note.toLowerCase().includes(q))
      )
    }

    if (filters.category && filters.category !== 'All') {
      result = result.filter((tx) => tx.category === filters.category)
    }

    if (filters.type && filters.type !== 'all') {
      result = result.filter((tx) => tx.type === filters.type)
    }

    if (filters.dateFrom) {
      try {
        const from = parseISO(filters.dateFrom)
        result = result.filter((tx) => parseISO(tx.date) >= from)
      } catch {}
    }

    if (filters.dateTo) {
      try {
        const to = parseISO(filters.dateTo)
        result = result.filter((tx) => parseISO(tx.date) <= to)
      } catch {}
    }

    result.sort((a, b) => {
      let valA, valB
      if (filters.sortBy === 'date') {
        valA = a.date; valB = b.date
      } else if (filters.sortBy === 'amount') {
        valA = a.amount; valB = b.amount
      } else if (filters.sortBy === 'category') {
        valA = a.category; valB = b.category
      } else {
        valA = a.date; valB = b.date
      }
      const cmp = valA < valB ? -1 : valA > valB ? 1 : 0
      return filters.sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [transactions, filters])
}
