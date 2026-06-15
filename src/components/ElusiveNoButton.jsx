import { useCallback, useEffect, useRef, useState } from 'react'

export default function ElusiveNoButton({ containerRef }) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState(null)

  const moveButton = useCallback(() => {
    const container = containerRef.current
    const button = buttonRef.current
    if (!container || !button) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const padding = 8
    const maxX = Math.max(0, containerRect.width - buttonRect.width - padding)
    const maxY = Math.max(0, containerRect.height - buttonRect.height - padding)

    setPosition({
      x: padding + Math.random() * maxX,
      y: padding + Math.random() * maxY,
    })
  }, [containerRef])

  useEffect(() => {
    const container = containerRef.current
    const button = buttonRef.current
    if (!container || !button || position) return

    const containerRect = container.getBoundingClientRect()
    const buttonRect = button.getBoundingClientRect()
    const yesButton = container.querySelector('.btn-yes')
    const yesRect = yesButton?.getBoundingClientRect()

    const startX = yesRect
      ? yesRect.right - containerRect.left + 16
      : containerRect.width / 2
    const startY = yesRect
      ? yesRect.top - containerRect.top
      : containerRect.height / 2

    setPosition({
      x: Math.min(startX, containerRect.width - buttonRect.width - 8),
      y: Math.min(startY, containerRect.height - buttonRect.height - 8),
    })
  }, [containerRef, position])

  const handleEvade = (event) => {
    event.preventDefault()
    event.stopPropagation()
    moveButton()
  }

  return (
    <button
      ref={buttonRef}
      type="button"
      className="btn btn-no elusive"
      style={
        position
          ? { left: `${position.x}px`, top: `${position.y}px` }
          : undefined
      }
      onMouseEnter={handleEvade}
      onMouseDown={handleEvade}
      onTouchStart={handleEvade}
      onClick={handleEvade}
      aria-label="Yox düyməsi — tutmaq çətindir"
    >
      Yox 😅
    </button>
  )
}
