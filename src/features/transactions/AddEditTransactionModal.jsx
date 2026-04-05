import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { useFinanceStore } from '@/store/finance.store'
import { CATEGORIES } from '@/data/mockTransactions'
import { format } from 'date-fns'

const EMPTY_FORM = {
  date: format(new Date(), 'yyyy-MM-dd'),
  description: '',
  category: 'Food & Dining',
  type: 'expense',
  amount: '',
  note: '',
}

const validate = (form) => {
  const errors = {}
  if (!form.description.trim()) errors.description = 'Description is required'
  if (!form.amount || isNaN(Number(form.amount)) || Number(form.amount) <= 0)
    errors.amount = 'Enter a valid positive amount'
  if (!form.date) errors.date = 'Date is required'
  return errors
}

export default function AddEditTransactionModal({ transaction = null, onClose }) {
  const { addTransaction, editTransaction } = useFinanceStore()
  const isEdit = Boolean(transaction)

  const [form, setForm] = useState(
    isEdit
      ? { ...transaction, amount: String(transaction.amount) }
      : { ...EMPTY_FORM }
  )
  const [errors, setErrors] = useState({})

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }

    const payload = { ...form, amount: parseFloat(form.amount) }

    if (isEdit) {
      editTransaction(transaction.id, payload)
    } else {
      payload.id = `tx_${Date.now()}`
      addTransaction(payload)
    }
    onClose()
  }

  return (
    <div className="modal-backdrop" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div className="modal-header">
          <h2 className="modal-title" id="modal-title">
            {isEdit ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button className="btn btn-ghost btn-icon" onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-form-grid">
            {/* Description */}
            <div className="form-group">
              <label className="form-label" htmlFor="tx-description">Description *</label>
              <input
                id="tx-description"
                className={`form-input ${errors.description ? 'error' : ''}`}
                value={form.description}
                onChange={set('description')}
                placeholder="e.g. Coffee at Starbucks"
              />
              {errors.description && <span className="form-error">{errors.description}</span>}
            </div>

            {/* Amount & Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="tx-amount">Amount (USD) *</label>
                <input
                  id="tx-amount"
                  className={`form-input ${errors.amount ? 'error' : ''}`}
                  type="number"
                  min="0.01"
                  step="0.01"
                  value={form.amount}
                  onChange={set('amount')}
                  placeholder="0.00"
                />
                {errors.amount && <span className="form-error">{errors.amount}</span>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="tx-type">Type *</label>
                <select id="tx-type" className="form-select" value={form.type} onChange={set('type')}>
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>

            {/* Category & Date */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
              <div className="form-group">
                <label className="form-label" htmlFor="tx-category">Category *</label>
                <select id="tx-category" className="form-select" value={form.category} onChange={set('category')}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="tx-date">Date *</label>
                <input
                  id="tx-date"
                  className={`form-input ${errors.date ? 'error' : ''}`}
                  type="date"
                  value={form.date}
                  onChange={set('date')}
                />
                {errors.date && <span className="form-error">{errors.date}</span>}
              </div>
            </div>

            {/* Note */}
            <div className="form-group">
              <label className="form-label" htmlFor="tx-note">Note (optional)</label>
              <input
                id="tx-note"
                className="form-input"
                value={form.note}
                onChange={set('note')}
                placeholder="Add a note..."
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose} id="modal-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" id="modal-submit-btn">
              {isEdit ? 'Save Changes' : 'Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
