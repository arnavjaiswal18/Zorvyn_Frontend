import { useState } from 'react'
import { Pencil, Trash2, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react'
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions'
import { useFinanceStore } from '@/store/finance.store'
import { formatCurrency, formatDate } from '@/utils/formatters'
import { CATEGORY_ICONS, CATEGORY_COLORS } from '@/data/mockTransactions'
import AddEditTransactionModal from './AddEditTransactionModal'

const PAGE_SIZE = 15

const SortIcon = ({ col, sortBy, sortDir }) => {
  if (sortBy !== col) return <ArrowUpDown size={12} style={{ opacity: 0.4 }} />
  return sortDir === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />
}

export default function TransactionTable() {
  const transactions = useFilteredTransactions()
  const { filters, setFilters, deleteTransaction, role } = useFinanceStore()
  const [page, setPage] = useState(1)
  const [editTx, setEditTx] = useState(null)

  const totalPages = Math.max(1, Math.ceil(transactions.length / PAGE_SIZE))
  const paginated = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleSort = (col) => {
    if (filters.sortBy === col) {
      setFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' })
    } else {
      setFilters({ sortBy: col, sortDir: 'desc' })
    }
    setPage(1)
  }

  const handleDelete = (id) => {
    if (window.confirm('Delete this transaction?')) deleteTransaction(id)
  }

  return (
    <>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')} className={filters.sortBy === 'date' ? 'sorted' : ''}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Date <SortIcon col="date" sortBy={filters.sortBy} sortDir={filters.sortDir} />
                </span>
              </th>
              <th>Description</th>
              <th onClick={() => handleSort('category')} className={`col-hide-sm ${filters.sortBy === 'category' ? 'sorted' : ''}`}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Category <SortIcon col="category" sortBy={filters.sortBy} sortDir={filters.sortDir} />
                </span>
              </th>
              <th className="col-hide-md">Type</th>
              <th onClick={() => handleSort('amount')} className={filters.sortBy === 'amount' ? 'sorted' : ''}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  Amount <SortIcon col="amount" sortBy={filters.sortBy} sortDir={filters.sortDir} />
                </span>
              </th>
              {role === 'admin' && <th style={{ width: 80 }}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5}>
                  <div className="empty-state">
                    <div className="empty-state-icon">🔍</div>
                    <div className="empty-state-title">No transactions found</div>
                    <div className="empty-state-desc">Try adjusting your filters or adding a new transaction.</div>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((tx) => (
                <tr key={tx.id}>
                  <td style={{ color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                    {formatDate(tx.date)}
                  </td>
                  <td>
                    <div className="tx-description">{tx.description}</div>
                    {tx.note && <div className="tx-note">{tx.note}</div>}
                  </td>
                  <td className="col-hide-sm">
                    <span
                      className="tx-category-chip"
                      style={{ borderColor: CATEGORY_COLORS[tx.category] + '40' }}
                    >
                      {CATEGORY_ICONS[tx.category] || '💳'}
                      {tx.category}
                    </span>
                  </td>
                  <td className="col-hide-md">
                    <span className={`badge badge-${tx.type}`}>
                      {tx.type === 'income' ? '↑' : '↓'} {tx.type}
                    </span>
                  </td>
                  <td>
                    <span className={tx.type === 'income' ? 'tx-amount-income' : 'tx-amount-expense'}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {role === 'admin' && (
                    <td>
                      <div className="table-actions">
                        <button
                          className="btn btn-ghost btn-icon"
                          onClick={() => setEditTx(tx)}
                          title="Edit"
                          id={`edit-tx-${tx.id}`}
                          style={{ width: 30, height: 30 }}
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          className="btn btn-danger btn-icon"
                          onClick={() => handleDelete(tx.id)}
                          title="Delete"
                          id={`delete-tx-${tx.id}`}
                          style={{ width: 30, height: 30 }}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {transactions.length > 0 && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {Math.min((page - 1) * PAGE_SIZE + 1, transactions.length)}–{Math.min(page * PAGE_SIZE, transactions.length)} of {transactions.length} transactions
            </span>
            <div className="pagination-controls">
              <button className="page-btn" onClick={() => setPage(1)} disabled={page === 1}>«</button>
              <button className="page-btn" onClick={() => setPage((p) => p - 1)} disabled={page === 1}>‹</button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const p = Math.max(1, Math.min(page - 2 + i, totalPages - 4 + i, totalPages - Math.min(5, totalPages) + i + 1))
                return (
                  <button
                    key={p}
                    className={`page-btn ${page === p ? 'active' : ''}`}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              })}
              <button className="page-btn" onClick={() => setPage((p) => p + 1)} disabled={page === totalPages}>›</button>
              <button className="page-btn" onClick={() => setPage(totalPages)} disabled={page === totalPages}>»</button>
            </div>
          </div>
        )}
      </div>

      {editTx && (
        <AddEditTransactionModal
          transaction={editTx}
          onClose={() => setEditTx(null)}
        />
      )}
    </>
  )
}
