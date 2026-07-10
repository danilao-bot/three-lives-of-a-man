import { useState, useEffect } from 'react';
import { getStoredData, setStoredData, resetToDefaults } from '../utils/db';

/* ─── tiny helpers ──────────────────────────────────────────────────── */
const TABS = [
  { id: 'biography',   icon: '👤', label: 'Biography'   },
  { id: 'research',    icon: '🔬', label: 'Research'     },
  { id: 'opinion',     icon: '✍️',  label: 'Opinions'    },
  { id: 'fiction',     icon: '📖', label: 'Fiction'      },
  { id: 'affiliations',icon: '🏛️', label: 'Affiliations' },
  { id: 'book',        icon: '⚙️', label: 'Book Settings'},
];

function Field({ label, name, value, onChange, textarea, type = 'text', placeholder = '' }) {
  return (
    <div className="adm-field">
      <label className="adm-label">{label}</label>
      {textarea
        ? <textarea className="adm-input adm-textarea" name={name} value={value} onChange={onChange} placeholder={placeholder} rows={3} />
        : <input className="adm-input" type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} />
      }
    </div>
  );
}

/* ─── BIOGRAPHY TAB ─────────────────────────────────────────────────── */
function BiographyTab() {
  const [data, setData] = useState(() => getStoredData('biography'));
  const [saved, setSaved] = useState(false);

  function handleChange(e) {
    setData(d => ({ ...d, [e.target.name]: e.target.value }));
  }
  function handleSave() {
    setStoredData('biography', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="adm-section">
      <h3 className="adm-section-title">Biography &amp; Hero</h3>
      <Field label="Hero Tagline" name="heroTagline" value={data.heroTagline} onChange={handleChange} placeholder="Shaping the future of AI…" />
      <Field label="Intro Quote" name="introQuote" value={data.introQuote} onChange={handleChange} textarea placeholder="I believe technology…" />
      <Field label="Intro Paragraph 1" name="p1" value={data.introParagraphs?.[0] || ''} onChange={e => setData(d => ({ ...d, introParagraphs: [e.target.value, d.introParagraphs?.[1] || ''] }))} textarea />
      <Field label="Intro Paragraph 2" name="p2" value={data.introParagraphs?.[1] || ''} onChange={e => setData(d => ({ ...d, introParagraphs: [d.introParagraphs?.[0] || '', e.target.value] }))} textarea />
      <Field label="Intro Highlight" name="introHighlights" value={data.introHighlights} onChange={handleChange} textarea />
      <button className={`adm-btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
        {saved ? '✓ Saved!' : 'Save Changes'}
      </button>
    </div>
  );
}

/* ─── GENERIC LIST TAB ──────────────────────────────────────────────── */
function ListTab({ storeKey, title, emptyItem, fields }) {
  const [items, setItems]   = useState(() => getStoredData(storeKey));
  const [editing, setEditing] = useState(null);   // {index, item}
  const [adding, setAdding]  = useState(false);
  const [draft, setDraft]    = useState({});
  const [saved, setSaved]    = useState(false);

  function openEdit(index) { setDraft({ ...items[index] }); setEditing(index); setAdding(false); }
  function openAdd()       { setDraft({ ...emptyItem });    setAdding(true);   setEditing(null); }
  function closeForm()     { setEditing(null); setAdding(false); setDraft({}); }

  function handleDraftChange(e) {
    setDraft(d => ({ ...d, [e.target.name]: e.target.value }));
  }

  function persist(newItems) {
    setItems(newItems);
    setStoredData(storeKey, newItems);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleSaveItem() {
    let updated;
    if (adding) {
      updated = [...items, draft];
    } else {
      updated = items.map((it, i) => i === editing ? draft : it);
    }
    persist(updated);
    closeForm();
  }

  function handleDelete(index) {
    if (!window.confirm('Delete this item?')) return;
    persist(items.filter((_, i) => i !== index));
  }

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <h3 className="adm-section-title">{title}</h3>
        <button className="adm-btn-add" onClick={openAdd}>+ Add New</button>
      </div>

      {saved && <div className="adm-toast">✓ Saved</div>}

      {/* Item list */}
      <div className="adm-list">
        {items.map((item, i) => (
          <div className="adm-item" key={i}>
            <div className="adm-item-body">
              <span className="adm-item-tag">{item.tag || item.mark || '—'}</span>
              <span className="adm-item-title">{item.title || item.name || item.heroTagline || '(untitled)'}</span>
            </div>
            <div className="adm-item-actions">
              <button className="adm-btn-edit" onClick={() => openEdit(i)}>Edit</button>
              <button className="adm-btn-del"  onClick={() => handleDelete(i)}>✕</button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="adm-empty">No items yet — click "Add New" to get started.</p>}
      </div>

      {/* Edit / Add form */}
      {(editing !== null || adding) && (
        <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && closeForm()}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <h4 className="adm-modal-title">{adding ? 'Add Item' : 'Edit Item'}</h4>
              <button className="adm-modal-close" onClick={closeForm}>✕</button>
            </div>
            <div className="adm-modal-body">
              {fields.map(f => (
                <Field
                  key={f.name}
                  label={f.label}
                  name={f.name}
                  value={draft[f.name] || ''}
                  onChange={handleDraftChange}
                  textarea={f.textarea}
                  type={f.type}
                  placeholder={f.placeholder}
                />
              ))}
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn-cancel" onClick={closeForm}>Cancel</button>
              <button className="adm-btn-save"   onClick={handleSaveItem}>Save Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── BOOK SETTINGS TAB ─────────────────────────────────────────────── */
function BookTab() {
  const [data, setData] = useState(() => getStoredData('bookSettings'));
  const [saved, setSaved] = useState(false);

  function handleChange(e) { setData(d => ({ ...d, [e.target.name]: e.target.value })); }
  function handleSave() {
    setStoredData('bookSettings', data);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="adm-section">
      <h3 className="adm-section-title">Book Launch Settings</h3>
      <Field label="Countdown Target Date (ISO format)" name="countdownTarget" value={data.countdownTarget} onChange={handleChange} placeholder="2026-08-01T00:00:00" />
      <Field label="Digital Price" name="digitalPrice" value={data.digitalPrice} onChange={handleChange} placeholder="₦5,000" />
      <Field label="Purchase Link" name="purchaseLink" value={data.purchaseLink} onChange={handleChange} placeholder="https://paystack.com/…" />
      <button className={`adm-btn-save ${saved ? 'saved' : ''}`} onClick={handleSave}>
        {saved ? '✓ Saved!' : 'Save Settings'}
      </button>
    </div>
  );
}

/* ─── MAIN ADMIN COMPONENT ──────────────────────────────────────────── */
export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('felix_admin') === 'yes');
  const [code, setCode]         = useState('');
  const [error, setError]       = useState('');
  const [activeTab, setActiveTab] = useState('biography');
  const [resetting, setResetting] = useState(false);

  function handleUnlock(e) {
    e.preventDefault();
    if (code === 'felix2024') {
      sessionStorage.setItem('felix_admin', 'yes');
      setUnlocked(true);
      setError('');
    } else {
      setError('Incorrect passcode. Try again.');
      setCode('');
    }
  }

  function handleLogout() {
    sessionStorage.removeItem('felix_admin');
    setUnlocked(false);
    setCode('');
  }

  function handleReset() {
    if (!window.confirm('Reset ALL content to factory defaults? This cannot be undone.')) return;
    resetToDefaults();
    setResetting(true);
    setTimeout(() => setResetting(false), 1500);
  }

  /* ── Lock screen ── */
  if (!unlocked) {
    return (
      <div className="adm-lock-screen">
        <div className="adm-lock-card">
          <div className="adm-lock-icon">🔐</div>
          <h2 className="adm-lock-title">Admin Access</h2>
          <p className="adm-lock-sub">Enter your passcode to manage site content</p>
          <form onSubmit={handleUnlock} className="adm-lock-form">
            <input
              className="adm-input adm-lock-input"
              type="password"
              value={code}
              onChange={e => setCode(e.target.value)}
              placeholder="Enter passcode"
              autoFocus
            />
            {error && <p className="adm-error">{error}</p>}
            <button className="adm-btn-unlock" type="submit">Unlock Panel</button>
          </form>
        </div>
      </div>
    );
  }

  /* ── Admin panel ── */
  const renderTab = () => {
    switch (activeTab) {
      case 'biography':    return <BiographyTab />;
      case 'research':     return (
        <ListTab
          storeKey="researchPapers"
          title="Research Papers"
          emptyItem={{ tag: '', title: '', citation: '', link: '' }}
          fields={[
            { name: 'tag',      label: 'Tag / Category',  placeholder: 'e.g. Education'         },
            { name: 'title',    label: 'Paper Title',      placeholder: 'Full title…', textarea: true },
            { name: 'citation', label: 'Journal & Year',   placeholder: 'Journal Name · 2024'   },
            { name: 'link',     label: 'Link / URL',       placeholder: 'https://…'             },
          ]}
        />
      );
      case 'opinion': return (
        <ListTab
          storeKey="opinionArticles"
          title="Opinion Articles"
          emptyItem={{ tag: '', title: '', excerpt: '', metaDate: '', metaRead: '', link: '' }}
          fields={[
            { name: 'tag',      label: 'Tag',            placeholder: 'e.g. Identity'           },
            { name: 'title',    label: 'Title',          placeholder: 'Article title…'           },
            { name: 'excerpt',  label: 'Excerpt',        placeholder: 'Short preview…', textarea: true },
            { name: 'metaDate', label: 'Date',           placeholder: 'June 2026'               },
            { name: 'metaRead', label: 'Read Time',      placeholder: '4 min read'              },
            { name: 'link',     label: 'Link / URL',     placeholder: 'https://…'               },
          ]}
        />
      );
      case 'fiction': return (
        <ListTab
          storeKey="fictionArticles"
          title="Fiction Stories"
          emptyItem={{ tag: '', title: '', excerpt: '', metaWords: '', metaType: '', linkText: '', link: '' }}
          fields={[
            { name: 'tag',       label: 'Tag',          placeholder: 'e.g. Short Story'          },
            { name: 'title',     label: 'Title',        placeholder: 'Story title…'              },
            { name: 'excerpt',   label: 'Excerpt',      placeholder: 'Short preview…', textarea: true },
            { name: 'metaWords', label: 'Word Count',   placeholder: '2,400 words'               },
            { name: 'metaType',  label: 'Type',         placeholder: 'Excerpt or Complete'       },
            { name: 'linkText',  label: 'Link Text',    placeholder: 'Read excerpt →'            },
            { name: 'link',      label: 'Link / URL',   placeholder: 'https://…'                 },
          ]}
        />
      );
      case 'affiliations': return (
        <ListTab
          storeKey="affiliations"
          title="Affiliations"
          emptyItem={{ mark: '', tag: '', name: '', role: '', period: '' }}
          fields={[
            { name: 'mark',   label: 'Initials / Mark',   placeholder: 'e.g. U'                  },
            { name: 'tag',    label: 'Category Tag',       placeholder: 'e.g. Academic'            },
            { name: 'name',   label: 'Institution / Org',  placeholder: 'Full name of institution' },
            { name: 'role',   label: 'Your Role',          placeholder: 'e.g. Faculty & Researcher'},
            { name: 'period', label: 'Period',             placeholder: '2020 — Present'           },
          ]}
        />
      );
      case 'book': return <BookTab />;
      default:     return null;
    }
  };

  return (
    <div className="adm-shell">
      {/* Sidebar */}
      <aside className="adm-sidebar">
        <div className="adm-sidebar-brand">
          <span className="adm-brand-dot" />
          <span className="adm-brand-name">Dr. Felix <span className="adm-brand-cms">CMS</span></span>
        </div>

        <nav className="adm-nav">
          {TABS.map(t => (
            <button
              key={t.id}
              className={`adm-nav-item ${activeTab === t.id ? 'active' : ''}`}
              onClick={() => setActiveTab(t.id)}
            >
              <span className="adm-nav-icon">{t.icon}</span>
              <span className="adm-nav-label">{t.label}</span>
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <button className="adm-btn-reset" onClick={handleReset}>
            {resetting ? '✓ Reset!' : '↺ Reset Defaults'}
          </button>
          <button className="adm-btn-logout" onClick={handleLogout}>Sign Out</button>
          <a href="#/" className="adm-btn-viewsite">← View Site</a>
        </div>
      </aside>

      {/* Main content */}
      <main className="adm-main">
        <header className="adm-topbar">
          <div>
            <h2 className="adm-topbar-title">{TABS.find(t => t.id === activeTab)?.label}</h2>
            <p className="adm-topbar-sub">Changes save to localStorage and update the site immediately.</p>
          </div>
          <div className="adm-topbar-badge">Admin Panel · Hidden</div>
        </header>

        <div className="adm-content">
          {renderTab()}
        </div>
      </main>
    </div>
  );
}
