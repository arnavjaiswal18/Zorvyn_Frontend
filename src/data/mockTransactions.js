import { subDays, subMonths, format } from 'date-fns'

const today = new Date()

const d = (daysAgo) => format(subDays(today, daysAgo), 'yyyy-MM-dd')
const m = (monthsAgo, day) => format(new Date(today.getFullYear(), today.getMonth() - monthsAgo, day), 'yyyy-MM-dd')

export const CATEGORIES = [
  'Food & Dining',
  'Transport',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Utilities',
  'Income',
  'Investment',
]

export const CATEGORY_COLORS = {
  'Food & Dining': '#f97316',
  'Transport': '#3b82f6',
  'Shopping': '#a855f7',
  'Entertainment': '#ec4899',
  'Healthcare': '#22c55e',
  'Utilities': '#eab308',
  'Income': '#6366f1',
  'Investment': '#14b8a6',
}

export const CATEGORY_ICONS = {
  'Food & Dining': '🍽️',
  'Transport': '🚗',
  'Shopping': '🛍️',
  'Entertainment': '🎬',
  'Healthcare': '💊',
  'Utilities': '⚡',
  'Income': '💰',
  'Investment': '📈',
}

let _id = 1
const tx = (date, description, category, amount, type, note = '') => ({
  id: String(_id++),
  date,
  description,
  category,
  amount,
  type, // 'income' | 'expense'
  note,
})

export const MOCK_TRANSACTIONS = [
  // --- Current Month ---
  tx(d(0),  'Monthly Salary',         'Income',        5800.00, 'income',  'Net salary after tax'),
  tx(d(1),  'Spotify Premium',        'Entertainment',   14.99, 'expense'),
  tx(d(1),  'Whole Foods Market',     'Food & Dining',   87.45, 'expense', 'Weekly grocery run'),
  tx(d(2),  'Uber Ride',              'Transport',        12.30, 'expense'),
  tx(d(3),  'Netflix',                'Entertainment',   17.99, 'expense'),
  tx(d(3),  'Chipotle',               'Food & Dining',   13.75, 'expense'),
  tx(d(4),  'Amazon Purchase',        'Shopping',        64.99, 'expense', 'New headphones'),
  tx(d(4),  'Freelance Project',      'Income',         950.00, 'income',  'UI design contract'),
  tx(d(5),  'Gym Membership',         'Healthcare',      45.00, 'expense'),
  tx(d(5),  'Coffee Shop',            'Food & Dining',    8.50, 'expense'),
  tx(d(6),  'Electric Bill',          'Utilities',       92.00, 'expense'),
  tx(d(6),  'Starbucks',              'Food & Dining',    6.75, 'expense'),
  tx(d(7),  'Sushi Restaurant',       'Food & Dining',   58.00, 'expense', 'Dinner with friends'),
  tx(d(8),  'Lyft Ride',              'Transport',       15.60, 'expense'),
  tx(d(8),  'ZARA Clothing',          'Shopping',       112.00, 'expense'),
  tx(d(9),  'Pharmacy',               'Healthcare',      23.40, 'expense'),
  tx(d(10), 'Google One Storage',     'Utilities',        2.99, 'expense'),
  tx(d(10), 'Dinner out',             'Food & Dining',   42.00, 'expense'),
  tx(d(11), 'ETF Investment',         'Investment',     300.00, 'expense', 'S&P 500 index fund'),
  tx(d(12), 'Movie Theater',          'Entertainment',   28.00, 'expense', 'Tickets x2'),
  tx(d(13), 'Meal Prep Ingredients',  'Food & Dining',   54.00, 'expense'),
  tx(d(14), 'Internet Bill',          'Utilities',       65.00, 'expense'),
  tx(d(15), 'Dividend Income',        'Income',          42.50, 'income',  'Quarterly dividend'),
  tx(d(15), 'Pharmacy',               'Healthcare',      18.99, 'expense'),
  tx(d(16), 'Taxi',                   'Transport',       22.00, 'expense'),
  tx(d(17), 'Online Course',          'Education',       29.99, 'expense', 'React advanced patterns'),
  tx(d(18), 'Steam Games',            'Entertainment',   59.99, 'expense'),
  tx(d(19), 'Water Bill',             'Utilities',       38.00, 'expense'),
  tx(d(20), 'Trader Joes',            'Food & Dining',   73.20, 'expense', 'Grocery run'),
  tx(d(21), 'Nike Shoes',             'Shopping',       130.00, 'expense'),

  // --- Last Month ---
  tx(m(1, 28), 'Monthly Salary',      'Income',        5800.00, 'income'),
  tx(m(1, 27), 'Side Project',        'Income',        1200.00, 'income',  'Dashboard project'),
  tx(m(1, 26), 'Grocery Store',       'Food & Dining',   96.00, 'expense'),
  tx(m(1, 25), 'Uber Eats',           'Food & Dining',   35.80, 'expense'),
  tx(m(1, 24), 'Monthly Bus Pass',    'Transport',       85.00, 'expense'),
  tx(m(1, 23), 'Amazon Shopping',     'Shopping',        48.99, 'expense'),
  tx(m(1, 22), 'Dentist Visit',       'Healthcare',     120.00, 'expense'),
  tx(m(1, 21), 'Electric Bill',       'Utilities',       88.00, 'expense'),
  tx(m(1, 20), 'Concert Tickets',     'Entertainment',   95.00, 'expense', 'Taylor Swift concert'),
  tx(m(1, 19), 'ETF Investment',      'Investment',     500.00, 'expense'),
  tx(m(1, 18), 'Restaurant',          'Food & Dining',   67.00, 'expense'),
  tx(m(1, 17), 'Gas Station',         'Transport',       55.00, 'expense'),
  tx(m(1, 15), 'Book Store',          'Shopping',        32.00, 'expense'),
  tx(m(1, 14), 'Internet Bill',       'Utilities',       65.00, 'expense'),
  tx(m(1, 10), 'Coffee',              'Food & Dining',   24.00, 'expense'),
  tx(m(1,  5), 'Movie Night',         'Entertainment',   22.00, 'expense'),

  // --- 2 Months Ago ---
  tx(m(2, 28), 'Monthly Salary',      'Income',        5800.00, 'income'),
  tx(m(2, 27), 'Grocery Store',       'Food & Dining',   89.50, 'expense'),
  tx(m(2, 25), 'Gym Membership',      'Healthcare',      45.00, 'expense'),
  tx(m(2, 24), 'Electric Bill',       'Utilities',      101.00, 'expense'),
  tx(m(2, 22), 'Online Shopping',     'Shopping',        76.00, 'expense'),
  tx(m(2, 20), 'Spotify',             'Entertainment',   14.99, 'expense'),
  tx(m(2, 18), 'ETF Investment',      'Investment',     400.00, 'expense'),
  tx(m(2, 15), 'Doctor Visit',        'Healthcare',      80.00, 'expense'),
  tx(m(2, 12), 'Uber',                'Transport',       18.00, 'expense'),
  tx(m(2, 10), 'Internet',            'Utilities',       65.00, 'expense'),
  tx(m(2,  8), 'Restaurant',          'Food & Dining',   54.00, 'expense'),
  tx(m(2,  5), 'Freelance',           'Income',         600.00, 'income'),
  tx(m(2,  3), 'Netflix',             'Entertainment',   17.99, 'expense'),

  // --- 3 Months Ago ---
  tx(m(3, 28), 'Monthly Salary',      'Income',        5800.00, 'income'),
  tx(m(3, 25), 'Grocery Store',       'Food & Dining',   92.00, 'expense'),
  tx(m(3, 24), 'Electric Bill',       'Utilities',       95.00, 'expense'),
  tx(m(3, 22), 'Online Shopping',     'Shopping',       145.00, 'expense', 'Black Friday deals'),
  tx(m(3, 20), 'ETF Investment',      'Investment',     300.00, 'expense'),
  tx(m(3, 18), 'Restaurant',          'Food & Dining',   78.00, 'expense'),
  tx(m(3, 15), 'Transport',           'Transport',       45.00, 'expense'),
  tx(m(3, 10), 'Entertainment',       'Entertainment',   55.00, 'expense'),
  tx(m(3,  5), 'Freelance',           'Income',         800.00, 'income'),
]

// Add Education to categories if needed
if (!CATEGORIES.includes('Education')) CATEGORIES.push('Education')
CATEGORY_COLORS['Education'] = '#06b6d4'
CATEGORY_ICONS['Education'] = '📚'
