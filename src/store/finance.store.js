import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { MOCK_TRANSACTIONS } from '@/data/mockTransactions'

const defaultFilters = {
  search: '',
  category: 'All',
  type: 'all',
  sortBy: 'date',
  sortDir: 'desc',
  dateFrom: '',
  dateTo: '',
}

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: MOCK_TRANSACTIONS,
      filters: { ...defaultFilters },
      role: 'admin', // 'admin' | 'viewer'

      // --- Role ---
      setRole: (role) => set({ role }),

      // --- Filters ---
      setFilters: (updates) =>
        set((state) => ({ filters: { ...state.filters, ...updates } })),
      resetFilters: () => set({ filters: { ...defaultFilters } }),

      // --- Transactions CRUD ---
      addTransaction: (tx) =>
        set((state) => ({
          transactions: [tx, ...state.transactions],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((tx) =>
            tx.id === id ? { ...tx, ...updates } : tx
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((tx) => tx.id !== id),
        })),
    }),
    {
      name: 'zorvyn-finance-store',
      // Only persist transactions and role, not filters
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
      }),
    }
  )
)
