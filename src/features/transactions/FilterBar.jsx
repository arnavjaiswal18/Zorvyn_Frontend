import { useEffect, useState } from 'react'
import { Search, X, SlidersHorizontal } from 'lucide-react'
import { useFinanceStore } from '@/store/finance.store'
import { useDebounce } from '@/hooks/useDebounce'
import { CATEGORIES } from '@/data/mockTransactions'

export default function FilterBar() {
  const { filters, setFilters, resetFilters } = useFinanceStore()
  const [localSearch, setLocalSearch] = useState(filters.search)
  const debouncedSearch = useDebounce(localSearch, 300)

  useEffect(() => {
    setFilters({ search: debouncedSearch })
  }, [debouncedSearch])

  const hasActiveFilters =
    filters.search || filters.category !== 'All' || filters.type !== 'all' ||
    filters.dateFrom || filters.dateTo

  return (
    <div className="filter-bar">
      {/* Search */}
      <div className="filter-search-wrap">
        <span className="filter-search-icon">
          <Search size={15} />
        </span>
        <input
          type="text"
          className="form-input"
          placeholder="Search transactions..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          id="filter-search"
        />
      </div>

      {/* Category */}
      <select
        className="form-select"
        style={{ width: 'auto', minWidth: 150 }}
        value={filters.category}
        onChange={(e) => setFilters({ category: e.target.value })}
        id="filter-category"
      >
        <option value="All">All Categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* Type */}
      <div className="tabs" style={{ flexShrink: 0 }}>
        {['all', 'income', 'expense'].map((t) => (
          <button
            key={t}
            className={`tab ${filters.type === t ? 'active' : ''}`}
            onClick={() => setFilters({ type: t })}
            id={`filter-type-${t}`}
          >
            {t === 'all' ? 'All' : t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className="filter-divider" />

      {/* Date range */}
      <input
        type="date"
        className="form-input"
        style={{ width: 'auto' }}
        value={filters.dateFrom}
        onChange={(e) => setFilters({ dateFrom: e.target.value })}
        title="From date"
        id="filter-date-from"
      />
      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', flexShrink: 0 }}>to</span>
      <input
        type="date"
        className="form-input"
        style={{ width: 'auto' }}
        value={filters.dateTo}
        onChange={(e) => setFilters({ dateTo: e.target.value })}
        title="To date"
        id="filter-date-to"
      />

      {/* Clear */}
      {hasActiveFilters && (
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => { resetFilters(); setLocalSearch('') }}
          style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 4 }}
          id="filter-clear-btn"
        >
          <X size={13} /> Clear
        </button>
      )}
    </div>
  )
}
