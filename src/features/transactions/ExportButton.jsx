import { useState } from 'react'
import { Download, ChevronDown } from 'lucide-react'
import { exportToCSV, exportToJSON } from '@/utils/exportData'
import { useFilteredTransactions } from '@/hooks/useFilteredTransactions'

export default function ExportButton() {
  const [open, setOpen] = useState(false)
  const transactions = useFilteredTransactions()

  const handleCSV  = () => { exportToCSV(transactions);  setOpen(false) }
  const handleJSON = () => { exportToJSON(transactions); setOpen(false) }

  return (
    <div style={{ position: 'relative' }}>
      <button
        className="btn btn-ghost"
        onClick={() => setOpen((o) => !o)}
        id="export-btn"
        style={{ display: 'flex', alignItems: 'center', gap: 6 }}
      >
        <Download size={15} />
        Export
        <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : '' }} />
      </button>

      {open && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, zIndex: 40 }}
            onClick={() => setOpen(false)}
          />
          <div style={{
            position: 'absolute',
            top: 'calc(100% + 6px)',
            right: 0,
            zIndex: 50,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-strong)',
            borderRadius: 'var(--radius-md)',
            padding: '6px',
            minWidth: 140,
            boxShadow: 'var(--shadow-lg)',
            animation: 'fadeUp 0.15s ease',
          }}>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={handleCSV} id="export-csv-btn">
              Export as CSV
            </button>
            <button className="btn btn-ghost" style={{ width: '100%', justifyContent: 'flex-start' }} onClick={handleJSON} id="export-json-btn">
              Export as JSON
            </button>
          </div>
        </>
      )}
    </div>
  )
}
