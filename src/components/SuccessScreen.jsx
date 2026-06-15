export default function SuccessScreen() {
  return (
    <section className="success-screen">
      <div className="success-badge">Cavab qəbul edildi</div>

      <div className="heart-burst" aria-hidden="true">
        <span className="heart-ring" />
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="burst-heart" style={{ '--i': i }}>
            {i % 3 === 0 ? '💕' : i % 3 === 1 ? '❤️' : '✨'}
          </span>
        ))}
        <span className="main-heart">💗</span>
      </div>

      <p className="success-message">
        Cavabın qəbul edildi ❤️ Görüşümüzü səbirsizliklə gözləyirəm!
      </p>
    </section>
  )
}
