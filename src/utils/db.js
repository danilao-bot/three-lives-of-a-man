// Client-side database utility using localStorage to manage website content dynamically.

const DB_PREFIX = 'felix_portfolio_';

// Default mock data to populate the site initially
const DEFAULT_DATA = {
  // Biography & Hero details
  biography: {
    heroEyebrow: "Researcher · Educator · Entrepreneur",
    heroHeadline: "Building Intelligent Systems.\nAdvancing Knowledge.\nInspiring Innovation.",
    heroTagline: "Shaping the future of AI, education, and technology across Africa.",
    introQuote: "I believe technology should do more than automate processes—it should solve meaningful problems, inspire innovation, and improve lives.",
    introParagraphs: [
      "As an Artificial Intelligence researcher, university lecturer, author, and technology entrepreneur, my work bridges academic excellence with practical innovation. Through research, teaching, writing, and product development, I strive to make emerging technologies more accessible, trustworthy, and impactful for individuals, organizations, and society.",
      "Whether I'm publishing research, authoring books, mentoring future innovators, speaking at conferences, or building AI-driven solutions, my mission remains constant:"
    ],
    introHighlights: "To create knowledge that empowers people and technology that transforms lives.",
    philosophyQuote: "Knowledge creates possibilities.\nInnovation creates impact.\nLeadership creates legacy.",
    philosophyParagraph: "I believe the true value of knowledge lies not only in discovering new ideas but in sharing them, applying them, and empowering others to build upon them. Through research, writing, teaching, and innovation, I am committed to advancing technologies that serve humanity and contribute to Africa's digital future.",
    contactEmail: "info@drfelix.com",
    contactLocation: "Departments of Computer Science & Artificial Intelligence",
    roles: [
      "Artificial Intelligence Researcher",
      "Author",
      "University Lecturer",
      "Technology Leader",
      "AI Engineer",
      "Entrepreneur",
      "International Speaker",
      "Software Developer",
      "Digital Transformation Consultant",
      "Research Supervisor"
    ]
  },

  // Research Publications
  researchPapers: [
    {
      tag: 'Education',
      title: 'Rethinking Assessment: A Framework for Competency-Based Learning in Higher Education',
      citation: 'Journal of Educational Research & Practice · 2023',
      link: '#'
    },
    {
      tag: 'Pedagogy',
      title: 'Narrative as Pedagogy: Using Storytelling to Improve Retention in STEM Classrooms',
      citation: 'International Journal of Teaching & Learning · 2022',
      link: '#'
    },
    {
      tag: 'Entrepreneurship',
      title: 'Entrepreneurial Identity Formation Among First-Generation Founders',
      citation: 'Journal of Innovation & Enterprise · 2021',
      link: '#'
    },
    {
      tag: 'Technology',
      title: 'Digital Literacy and the Future of Work in Sub-Saharan Africa',
      citation: 'African Journal of Technology Studies · 2024',
      link: '#'
    },
    {
      tag: 'Writing',
      title: 'The Researcher as Storyteller: Bridging Academic Writing and Public Understanding',
      citation: 'Education & Society Symposium, Conference Proceedings · 2020',
      link: '#'
    },
    {
      tag: 'Curriculum',
      title: 'Building Resilient Curricula: Lessons From a Decade of Classroom Research',
      citation: 'Journal of Curriculum Studies · 2019',
      link: '#'
    }
  ],

  // Fiction Stories
  fictionArticles: [
    {
      tag: 'Short Story',
      title: 'The Last Letter',
      excerpt: "He found the letter folded into the family Bible, addressed to a son who never learned to read his father's handwriting until it was too late to ask what it meant.",
      metaWords: '2,400 words',
      metaType: 'Excerpt',
      linkText: 'Read excerpt →',
      link: '#'
    },
    {
      tag: 'Short Story',
      title: 'Salt and Memory',
      excerpt: 'Every July, the smell of the harbor brought her father back for exactly as long as it took the wind to change. This is the story of the years she waited for it.',
      metaWords: '1,800 words',
      metaType: 'Excerpt',
      linkText: 'Read excerpt →',
      link: '#'
    },
    {
      tag: 'Flash Fiction',
      title: 'What the River Kept',
      excerpt: 'Two brothers, one inheritance, and a river that remembered everything they tried to forget on its banks one summer.',
      metaWords: '950 words',
      metaType: 'Complete',
      linkText: 'Read story →',
      link: '#'
    },
    {
      tag: 'Short Story',
      title: 'Three Doors',
      excerpt: 'A man is given three doors and one rule: he may only choose the life behind one. He spends thirty years trying to open all of them at once.',
      metaWords: '3,100 words',
      metaType: 'Excerpt',
      linkText: 'Read excerpt →',
      link: '#'
    },
    {
      tag: 'Short Story',
      title: 'The Weight of Names',
      excerpt: 'She was named after a grandmother she never met, and spent her whole life wondering which parts of herself were actually hers.',
      metaWords: '2,000 words',
      metaType: 'Excerpt',
      linkText: 'Read excerpt →',
      link: '#'
    },
    {
      tag: 'Flash Fiction',
      title: 'Inheritance',
      excerpt: 'All he left behind fit into a single box. It took her a decade to understand that the box was never the point.',
      metaWords: '700 words',
      metaType: 'Complete',
      linkText: 'Read story →',
      link: '#'
    }
  ],

  // Opinions
  opinionArticles: [
    {
      tag: 'Identity',
      title: 'On Becoming: Why Identity Is Never a Fixed Address',
      excerpt: "We talk about identity like it's a place you arrive at once and stay. It isn't. It's closer to a house you keep renovating, sometimes against your will.",
      metaDate: 'June 2026',
      metaRead: '4 min read',
      link: '#'
    },
    {
      tag: 'Ambition',
      title: 'The Quiet Cost of Ambition',
      excerpt: 'Nobody warns you that the things you build to feel secure are often the same things that quietly cost you the people you built them for.',
      metaDate: 'May 2026',
      metaRead: '5 min read',
      link: '#'
    },
    {
      tag: 'Inheritance',
      title: 'What We Owe the Stories We Inherit',
      excerpt: 'Every family hands down more than furniture and surnames. It hands down a script. The work of growing up is deciding which lines to keep.',
      metaDate: 'April 2026',
      metaRead: '6 min read',
      link: '#'
    },
    {
      tag: 'Grief',
      title: "Grief Doesn't End — It Changes Shape",
      excerpt: "People keep waiting for grief to leave. It doesn't leave. It just stops standing in the doorway and starts sitting quietly in the corner.",
      metaDate: 'March 2026',
      metaRead: '4 min read',
      link: '#'
    },
    {
      tag: 'Building',
      title: 'Why Every Founder Should Read More Fiction',
      excerpt: 'Spreadsheets tell you what happened. Fiction tells you why people do what they do. You need both to build anything that lasts.',
      metaDate: 'Feb 2026',
      metaRead: '3 min read',
      link: '#'
    },
    {
      tag: 'Self',
      title: 'The Myth of "Having It All Figured Out"',
      excerpt: 'The most put-together people I know are the ones who stopped performing certainty. Confidence and clarity are not the same thing.',
      metaDate: 'Jan 2026',
      metaRead: '5 min read',
      link: '#'
    }
  ],

  // Affiliations
  affiliations: [
    {
      mark: 'U',
      tag: 'Academic',
      name: '[University / Institution Name]',
      role: 'Faculty & Researcher',
      period: '20XX — Present'
    },
    {
      mark: 'O',
      tag: 'Fellowship',
      name: '[Fellowship / Organization Name]',
      role: 'Fellow',
      period: '20XX'
    },
    {
      mark: 'V',
      tag: 'Enterprise',
      name: '[Venture / Company Name]',
      role: 'Founder',
      period: '20XX — Present'
    },
    {
      mark: 'P',
      tag: 'Professional Body',
      name: '[Professional Association Name]',
      role: 'Member',
      period: '20XX'
    },
    {
      mark: 'E',
      tag: 'Education',
      name: '[Advisory / Board Role]',
      role: 'Advisor',
      period: '20XX — Present'
    }
  ],

  // Book launch settings
  bookSettings: {
    countdownTarget: "2026-08-01T00:00:00",
    digitalPrice: "₦5,000",
    purchaseLink: "#"
  }
};

// Initialize DB elements if they do not exist
export function initDB() {
  Object.keys(DEFAULT_DATA).forEach((key) => {
    const storageKey = DB_PREFIX + key;
    if (!localStorage.getItem(storageKey)) {
      localStorage.setItem(storageKey, JSON.stringify(DEFAULT_DATA[key]));
    }
  });
}

// Get helper
export function getStoredData(key) {
  initDB();
  const val = localStorage.getItem(DB_PREFIX + key);
  try {
    const parsed = val ? JSON.parse(val) : DEFAULT_DATA[key];
    // If it's a plain object (not an array), merge default fields
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return { ...DEFAULT_DATA[key], ...parsed };
    }
    return parsed || DEFAULT_DATA[key];
  } catch (e) {
    return DEFAULT_DATA[key];
  }
}

// Set helper
export function setStoredData(key, data) {
  localStorage.setItem(DB_PREFIX + key, JSON.stringify(data));
  // Dispatch dynamic storage event for direct tab synchronization if open in multiple frames
  window.dispatchEvent(new Event('db-update'));
}

// Reset helper
export function resetToDefaults() {
  Object.keys(DEFAULT_DATA).forEach((key) => {
    localStorage.removeItem(DB_PREFIX + key);
  });
  initDB();
  window.dispatchEvent(new Event('db-update'));
}
