import faqItems from './faqItems';

export default function FAQ() {
  return (
    <section className="document-page faq-page" aria-labelledby="faq-title">
      <p className="eyebrow">Helpful basics</p>
      <h1 id="faq-title">FAQ</h1>
      <p className="intro">
        Short answers about how Caffinity tracks caffeine, privacy, reminders, and modeled estimates.
      </p>

      <div className="faq-list">
        {faqItems.map((item) => (
          <article className="faq-item" key={item.question}>
            <h2>{item.question}</h2>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
