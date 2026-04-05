import { useState } from 'react'
import { Plus } from 'lucide-react'
import FilterBar from './FilterBar'
import TransactionTable from './TransactionTable'
import ExportButton from './ExportButton'
import AddEditTransactionModal from './AddEditTransactionModal'
import { useFinanceStore } from '@/store/finance.store'
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions'

export default function TransactionsPage() {
  const role = useFinanceStore((s) => s.role)
  const [showAddModal, setShowAddModal] = useState(false)
  const transactions = useFilteredTransactions()

  return (
    <div>
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-6)' }}>
        <div>
          <h1 className="page-title">Transactions</h1>
          <p className="page-subtitle">
            {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
          <ExportButton />
          {role === 'admin' && (
            <button
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
              id="add-transaction-btn"
            >
              <Plus size={16} />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <FilterBar />

      {/* Table */}
      <TransactionTable />

      {/* Add Modal */}
      {showAddModal && (
        <AddEditTransactionModal onClose={() => setShowAddModal(false)} />
      )}
    </div>
  )
}
