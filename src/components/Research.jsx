import { useEffect } from 'react';

const researchPapers = [
  {
    tag: 'Education',
    title: 'Rethinking Assessment: A Framework for Competency-Based Learning in Higher Education',
    citation: 'Journal of Educational Research & Practice · 2023'
  },
  {
    tag: 'Pedagogy',
    title: 'Narrative as Pedagogy: Using Storytelling to Improve Retention in STEM Classrooms',
    citation: 'International Journal of Teaching & Learning · 2022'
  },
  {
    tag: 'Entrepreneurship',
    title: 'Entrepreneurial Identity Formation Among First-Generation Founders',
    citation: 'Journal of Innovation & Enterprise · 2021'
  },
  {
    tag: 'Technology',
    title: 'Digital Literacy and the Future of Work in Sub-Saharan Africa',
    citation: 'African Journal of Technology Studies · 2024'
  },
  {
    tag: 'Writing',
    title: 'The Researcher as Storyteller: Bridging Academic Writing and Public Understanding',
    citation: 'Education & Society Symposium, Conference Proceedings · 2020'
  },
  {
    tag: 'Curriculum',
    title: 'Building Resilient Curricula: Lessons From a Decade of Classroom Research',
    citation: 'Journal of Curriculum Studies · 2019'
  }
];

export default function Research() {
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
          <span className="eyebrow reveal">Research</span>
          <h1 className="reveal">Published work, before the page.</h1>
          <p className="lede reveal">Dr. Felix's academic research spans education, entrepreneurship, and the role narrative plays in how people learn and lead. Selected publications below.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="row-list reveal">
            {researchPapers.map((paper, index) => (
              <div key={index} className="row-item">
                <div className="row-main">
                  <div className="row-body">
                    <span className="tag">{paper.tag}</span>
                    <h3>{paper.title}</h3>
                    <p>{paper.citation}</p>
                  </div>
                </div>
                <a href="#" className="btn btn-ghost btn-sm" onClick={(e) => e.preventDefault()}>
                  Read Paper →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
