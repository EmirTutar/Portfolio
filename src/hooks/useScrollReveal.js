import { useEffect, useRef, useState } from 'react'

export function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const check = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight || document.documentElement.clientHeight
      if (rect.top < windowH * (1 - threshold) && rect.bottom > 0) {
        setVisible(true)
        cleanup()
      }
    }

    const obs = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver(
          ([entry]) => { if (entry.isIntersecting) { setVisible(true); cleanup() } },
          { threshold }
        )
      : null

    const cleanup = () => {
      obs?.disconnect()
      window.removeEventListener('scroll', check, { passive: true })
    }

    obs?.observe(el)
    window.addEventListener('scroll', check, { passive: true })
    check() // fire immediately in case element is already in view

    return cleanup
  }, [threshold])

  return [ref, visible]
}
