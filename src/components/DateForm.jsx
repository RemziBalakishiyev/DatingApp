import { useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabaseClient'

const DATE_TYPES = [
  { value: 'Səhər yeməyi', emoji: '🥐' },
  { value: 'Axşam yeməyi', emoji: '🕯️' },
  { value: 'Parkda gəzinti', emoji: '🌳' },
  { value: 'Coffee shop', emoji: '☕' },
  { value: 'Döner', emoji: '🌯' },
  { value: 'Bilyard', emoji: '🎱' },
  { value: 'KFC', emoji: '🍗' },
  { value: "McDonald's", emoji: '🍟' },
]

function getTodayString() {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export default function DateForm({ onSuccess }) {
  const [selectedDate, setSelectedDate] = useState('')
  const [dateType, setDateType] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const nextErrors = {}

    if (!selectedDate) {
      nextErrors.selectedDate = 'Zəhmət olmasa tarix seçin.'
    } else if (selectedDate < getTodayString()) {
      nextErrors.selectedDate = 'Keçmiş tarix seçilə bilməz.'
    }

    if (!dateType) {
      nextErrors.dateType = 'Date tipini seçin.'
    }

    if (!message.trim()) {
      nextErrors.message = 'Ürək sözlərinizi yazın.'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitError('')

    if (!validate()) return

    if (!isSupabaseConfigured || !supabase) {
      setSubmitError(
        'Supabase konfiqurasiya edilməyib. Vercel-də environment variables əlavə edin.',
      )
      return
    }

    setIsLoading(true)

    const { error } = await supabase.from('date_requests').insert({
      selected_date: selectedDate,
      date_type: dateType,
      message: message.trim(),
    })

    setIsLoading(false)

    if (error) {
      console.error('Supabase insert error:', error)
      setSubmitError(error.message || 'Göndərmə zamanı xəta baş verdi.')
      return
    }

    setSelectedDate('')
    setDateType('')
    setMessage('')
    setErrors({})
    onSuccess()
  }

  return (
    <section className="date-form-screen">
      <div className="screen-badge">Görüş planı</div>
      <h2 className="form-title">Tarix seçin</h2>
      <p className="form-subtitle">Gözəl bir gün seçək, yadda qalan anlar yaradaq</p>

      <form className="date-form" onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="selected-date">
            <span className="label-icon">📅</span> Görüş tarixi
          </label>
          <input
            id="selected-date"
            type="date"
            className={errors.selectedDate ? 'input-error' : ''}
            min={getTodayString()}
            value={selectedDate}
            onChange={(e) => {
              setSelectedDate(e.target.value)
              if (errors.selectedDate) {
                setErrors((prev) => ({ ...prev, selectedDate: '' }))
              }
            }}
          />
          {errors.selectedDate && (
            <p className="error-text">{errors.selectedDate}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="date-type">
            <span className="label-icon">💫</span> Nə tip date istəyirsiniz?
          </label>
          <select
            id="date-type"
            className={errors.dateType ? 'input-error' : ''}
            value={dateType}
            onChange={(e) => {
              setDateType(e.target.value)
              if (errors.dateType) {
                setErrors((prev) => ({ ...prev, dateType: '' }))
              }
            }}
          >
            <option value="">Seçim edin...</option>
            {DATE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.emoji} {type.value}
              </option>
            ))}
          </select>
          {errors.dateType && <p className="error-text">{errors.dateType}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="message">
            <span className="label-icon">💌</span> Ürək sözlərinizi yazın
          </label>
          <textarea
            id="message"
            className={errors.message ? 'input-error' : ''}
            rows={5}
            placeholder="Mənə demək istədiyin şirin sözləri bura yaz..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value)
              if (errors.message) {
                setErrors((prev) => ({ ...prev, message: '' }))
              }
            }}
          />
          {errors.message && <p className="error-text">{errors.message}</p>}
        </div>

        {submitError && <p className="submit-error">{submitError}</p>}

        <button type="submit" className="btn btn-submit" disabled={isLoading}>
          <span className="btn-shine" aria-hidden="true" />
          {isLoading ? 'Göndərilir...' : 'Göndər ❤️'}
        </button>
      </form>
    </section>
  )
}
