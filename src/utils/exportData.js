export const exportToCSV = (transactions, filename = 'transactions') => {
  const headers = ['Date', 'Description', 'Category', 'Type', 'Amount', 'Note']
  const rows = transactions.map((tx) => [
    tx.date,
    `"${tx.description}"`,
    tx.category,
    tx.type,
    tx.type === 'expense' ? -tx.amount : tx.amount,
    `"${tx.note || ''}"`,
  ])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  downloadFile(csv, `${filename}.csv`, 'text/csv')
}

export const exportToJSON = (transactions, filename = 'transactions') => {
  const json = JSON.stringify(transactions, null, 2)
  downloadFile(json, `${filename}.json`, 'application/json')
}

const downloadFile = (content, filename, mimeType) => {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
