import { ReactNode, useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  // Optional line under the title
  eyebrow?: string
  size?: "md" | "lg" | "xl"
}

const sizes = {
  md: "max-w-xl",
  lg: "max-w-3xl",
  xl: "max-w-5xl",
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])'

// Accessible dialog: focus moves in and is trapped, Escape/backdrop close it,
// focus returns to whatever opened it, and the page behind stops scrolling
export default function Modal({ open, onClose, title, children, eyebrow, size = "lg" }: ModalProps) {
  const [mounted, setMounted] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useRef(`modal-${Math.random().toString(36).slice(2)}`).current

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!open) return
    const previouslyFocused = document.activeElement as HTMLElement | null
    const dialog = dialogRef.current
    dialog?.querySelector<HTMLElement>("[data-autofocus]")?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation()
        onClose()
        return
      }
      if (e.key !== "Tab" || !dialog) return
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    const { overflow } = document.body.style
    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener("keydown", onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  if (!mounted || !open) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose() }}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={`relative w-full ${sizes[size]} max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-base-200 text-base-content shadow-2xl p-6 sm:p-8 animate-[popIn_250ms_ease-out]`}>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 btn btn-sm btn-circle btn-ghost">
          <span aria-hidden="true">✕</span>
        </button>
        {eyebrow ? <p className="mb-1 text-sm tracking-widest uppercase opacity-80">{eyebrow}</p> : null}
        <h2 id={titleId} className="pr-10 mb-4 text-2xl font-bold md:text-3xl">{title}</h2>
        {children}
      </div>
    </div>,
    document.body
  )
}
