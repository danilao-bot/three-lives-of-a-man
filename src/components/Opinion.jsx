import { useEffect } from 'react';

const opinionArticles = [
  {
    tag: 'Identity',
    title: 'On Becoming: Why Identity Is Never a Fixed Address',
    excerpt: "We talk about identity like it's a place you arrive at once and stay. It isn't. It's closer to a house you keep renovating, sometimes against your will.",
    metaDate: 'June 2026',
    metaRead: '4 min read'
  },
  {
    tag: 'Ambition',
    title: 'The Quiet Cost of Ambition',
    excerpt: 'Nobody warns you that the things you build to feel secure are often the same things that quietly cost you the people you built them for.',
    metaDate: 'May 2026',
    metaRead: '5 min read'
  },
  {
    tag: 'Inheritance',
    title: 'What We Owe the Stories We Inherit',
    excerpt: 'Every family hands down more than furniture and surnames. It hands down a script. The work of growing up is deciding which lines to keep.',
    metaDate: 'April 2026',
    metaRead: '6 min read'
  },
  {
    tag: 'Grief',
    title: "Grief Doesn't End — It Changes Shape",
    excerpt: "People keep waiting for grief to leave. It doesn't leave. It just stops standing in the doorway and starts sitting quietly in the corner.",
    metaDate: 'March 2026',
    metaRead: '4 min read'
  },
  {
    tag: 'Building',
    title: 'Why Every Founder Should Read More Fiction',
    excerpt: 'Spreadsheets tell you what happened. Fiction tells you why people do what they do. You need both to build anything that lasts.',
    metaDate: 'Feb 2026',
    metaRead: '3 min read'
  },
  {
    tag: 'Self',
    title: 'The Myth of "Having It All Figured Out"',
    excerpt: 'The most put-together people I know are the ones who stopped performing certainty. Confidence and clarity are not the same thing.',
    metaDate: 'Jan 2026',
    metaRead: '5 min read'
  }
];

export default function Opinion() {
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
          <span className="eyebrow reveal">Opinion</span>
          <h1 className="reveal">Thoughts, not headlines.</h1>
          <p className="lede reveal">Short, candid pieces on identity, ambition, and the things we carry. Updated occasionally — usually when something won't leave him alone.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3 reveal">
            {opinionArticles.map((art, index) => (
              <article key={index} className="card">
                <span className="tag">{art.tag}</span>
                <h3>{art.title}</h3>
                <p className="excerpt">{art.excerpt}</p>
                <div className="post-meta">
                  <span>{art.metaDate}</span>
                  <span className="dot-sep"></span>
                  <span>{art.metaRead}</span>
                </div>
                <a href="#" className="read" onClick={(e) => e.preventDefault()}>
                  Read more →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
