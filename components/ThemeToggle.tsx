'use client'

import { Moon, Sun } from 'lucide-react'

const STORAGE_KEY = 'mira-theme'

function toggleTheme() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light'
  const next = isLight ? 'dark' : 'light'

  document.documentElement.setAttribute('data-theme', next)

  try {
    localStorage.setItem(STORAGE_KEY, next)
  } catch {
    // Storage can be unavailable in private mode.
  }
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label="Basculer entre le thème clair et sombre"
      title="Changer de thème"
    >
      <Sun size={18} className="theme-icon-light" />
      <Moon size={18} className="theme-icon-dark" />
    </button>
  )
}
