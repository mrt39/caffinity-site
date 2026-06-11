import faqItems from './faqItems';

export default function FAQ() {
  return (
    <section className="document-page faq-page" aria-labelledby="faq-title">
      <h1 id="faq-title">FAQ</h1>
      <br />


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
