import { useEffect } from 'react';

const fictionArticles = [
  {
    tag: 'Short Story',
    title: 'The Last Letter',
    excerpt: "He found the letter folded into the family Bible, addressed to a son who never learned to read his father's handwriting until it was too late to ask what it meant.",
    metaWords: '2,400 words',
    metaType: 'Excerpt',
    linkText: 'Read excerpt →'
  },
  {
    tag: 'Short Story',
    title: 'Salt and Memory',
    excerpt: 'Every July, the smell of the harbor brought her father back for exactly as long as it took the wind to change. This is the story of the years she waited for it.',
    metaWords: '1,800 words',
    metaType: 'Excerpt',
    linkText: 'Read excerpt →'
  },
  {
    tag: 'Flash Fiction',
    title: 'What the River Kept',
    excerpt: 'Two brothers, one inheritance, and a river that remembered everything they tried to forget on its banks one summer.',
    metaWords: '950 words',
    metaType: 'Complete',
    linkText: 'Read story →'
  },
  {
    tag: 'Short Story',
    title: 'Three Doors',
    excerpt: 'A man is given three doors and one rule: he may only choose the life behind one. He spends thirty years trying to open all of them at once.',
    metaWords: '3,100 words',
    metaType: 'Excerpt',
    linkText: 'Read excerpt →'
  },
  {
    tag: 'Short Story',
    title: 'The Weight of Names',
    excerpt: 'She was named after a grandmother she never met, and spent her whole life wondering which parts of herself were actually hers.',
    metaWords: '2,000 words',
    metaType: 'Excerpt',
    linkText: 'Read excerpt →'
  },
  {
    tag: 'Flash Fiction',
    title: 'Inheritance',
    excerpt: 'All he left behind fit into a single box. It took her a decade to understand that the box was never the point.',
    metaWords: '700 words',
    metaType: 'Complete',
    linkText: 'Read story →'
  }
];

export default function Fiction() {
  useEffect(() => {
    // Reveal animation
    const targets = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) {
      targets.forEach(t => t.classList.add('is-visible'));
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    targets.forEach(t => obs.observe(t));

    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow reveal">Fiction</span>
          <h1 className="reveal">Stories that didn't make the book.</h1>
          <p className="lede reveal">Short fiction and excerpts — some finished, some still finding their ending.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3 reveal">
            {fictionArticles.map((art, index) => (
              <article key={index} className="card">
                <span className="tag">{art.tag}</span>
                <h3>{art.title}</h3>
                <p className="excerpt">{art.excerpt}</p>
                <div className="post-meta">
                  <span>{art.metaWords}</span>
                  <span className="dot-sep"></span>
                  <span>{art.metaType}</span>
                </div>
                <a href="#" className="read" onClick={(e) => e.preventDefault()}>
                  {art.linkText}
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
