# Finance Dashboard

A production-quality, responsive personal finance dashboard built with React, Vite, Zustand, and Recharts.

## Features

- **Dashboard**: High-level overview with summary cards, balance trend chart, and category spending pie chart. Bottom widgets show recent transactions and a breakdown of top spending categories.
- **Transactions Page**: Detailed paginated table. Features include:
  - Search by description or note.
  - Filter by category, type (income/expense), and date range.
  - Sort by date, amount, or category.
  - Export filtered transactions to CSV or JSON.
- **Insights Page**: Deep dive analytics with a month-over-month comparison, a bar chart of 6-month income vs expenses, and a tabular breakdown of all-time spending by category.
- **Role-Based UI**: Switch between 'Admin' and 'Viewer' in the top bar. Admin users unlock "Add Transaction" functionality and the ability to edit/delete items. Viewer mode is strictly read-only.
- **State Management & Persistence**: Uses Zustand to maintain a global store of your data. The transactions and your chosen role (Admin vs Viewer) persist in `localStorage`, retaining state across page reloads.
- **Aesthetic UI**: Dark-first glassmorphism design system developed with pure Vanilla CSS, utilizing CSS Modules & Custom Properties approach. Supports seamless switching between light and dark themes.

## Tech Stack

- React 18
- Vite
- Zustand
- React Router v6
- Recharts
- Lucide React
- date-fns

## Running Locally

To install and run the development server locally:

```bash
npm install
npm run dev
```

Visit the `localhost` URL provided in the terminal output to use the app.

## Deployment to Vercel

The project is already configured for deployment to **Vercel** with a included `vercel.json` file to handle **SPA Routing** (Single Page Application). 

When you push this repository to Vercel:
1. It will automatically detect **Vite** and use `npm run build` as the build command.
2. The Output Directory should automatically be set to `dist`.
3. Routing is pre-configured to ensure that refreshing pages like `/transactions` or `/insights` works perfectly without 404 errors.

## 🚧 Deployment Troubleshooting (Permission Denied)

If you see `vite: Permission denied` on Render or Vercel, it's because `node_modules` was accidentally committed to your repository.

### The Nuclear Fix:
1. **GitHub Cleanup**: Run these in your terminal and push:
   ```bash
   git rm -r --cached node_modules
   git commit -m "fix: remove node_modules from git index"
   git push origin main
   ```
2. **Render Dashboard**: Change your **Build Command** to:
   ```bash
   rm -rf node_modules && npm install && npm run build
   ```
3. **Redeploy**: In Render, select **"Clear Build Cache & Deploy"** from the manual deploy menu.

## 🚀 Port Binding Fix (Render Web Service)

If your Render deployment is stuck "scanning for open ports", it's because it is trying to run a development server instead of serving the production build.

### The Production Fix:
1. **Render Dashboard**: Change your **Start Command** to:
   ```bash
   npm start
   ```
2. **Alternative (Static Site)**: On Render, it is recommended to use the **"Static Site"** service type instead of "Web Service". It's free and optimized for Vite projects. Set the **Publish Directory** to `dist`.
