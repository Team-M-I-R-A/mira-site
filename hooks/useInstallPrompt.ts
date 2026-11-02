'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

/**
 * Capture l'événement `beforeinstallprompt` (même origine uniquement) et suit
 * l'état d'installation de l'application.
 */
export function useInstallPrompt() {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null)
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [isPrompting, setIsPrompting] = useState(false)

  useEffect(() => {
    const displayMode = window.matchMedia('(display-mode: standalone)')

    const syncInstalled = () => {
      const iosStandalone =
        (window.navigator as Navigator & { standalone?: boolean }).standalone === true
      setIsInstalled(displayMode.matches || iosStandalone)
    }

    const handleBeforeInstall = (event: Event) => {
      event.preventDefault()
      deferredPrompt.current = event as BeforeInstallPromptEvent
      setCanInstall(true)
    }

    const handleInstalled = () => {
      deferredPrompt.current = null
      setCanInstall(false)
      setIsInstalled(true)
    }

    syncInstalled()
    displayMode.addEventListener('change', syncInstalled)
    window.addEventListener('beforeinstallprompt', handleBeforeInstall)
    window.addEventListener('appinstalled', handleInstalled)

    return () => {
      displayMode.removeEventListener('change', syncInstalled)
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall)
      window.removeEventListener('appinstalled', handleInstalled)
    }
  }, [])

  const promptInstall = useCallback(async () => {
    const event = deferredPrompt.current
    if (!event) return null

    setIsPrompting(true)
    try {
      await event.prompt()
      const { outcome } = await event.userChoice
      deferredPrompt.current = null
      setCanInstall(false)
      return outcome
    } finally {
      setIsPrompting(false)
    }
  }, [])

  return { canInstall, isInstalled, isPrompting, promptInstall }
}
