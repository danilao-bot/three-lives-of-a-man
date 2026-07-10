import { useState } from 'react';
import { getStoredData, resetToDefaults, setStoredData } from '../utils/db';

const TABS = [
  {
    id: 'biography',
    label: 'Biography',
    description: 'Edit homepage hero copy, intro quote, and author summary.',
    previewHref: '#/',
  },
  {
    id: 'research',
    label: 'Research',
    description: 'Manage papers and publications shown on the Research page.',
    previewHref: '#/research',
    addLabel: 'Add Paper',
  },
  {
    id: 'opinion',
    label: 'Opinions',
    description: 'Manage essays, commentary, and public notes.',
    previewHref: '#/opinion',
    addLabel: 'Add Article',
  },
  {
    id: 'fiction',
    label: 'Fiction',
    description: 'Manage fiction excerpts and short stories.',
    previewHref: '#/fiction',
    addLabel: 'Add Story',
  },
  {
    id: 'affiliations',
    label: 'Affiliations',
    description: 'Manage institutions, roles, ventures, and memberships.',
    previewHref: '#/affiliations',
    addLabel: 'Add Affiliation',
  },
  {
    id: 'book',
    label: 'Book Settings',
    description: 'Update launch countdown, pricing, and purchase destination.',
    previewHref: '#/book',
  },
];

function getTab(id) {
  return TABS.find(tab => tab.id === id) || TABS[0];
}

function Field({ label, name, value, onChange, textarea, type = 'text', placeholder = '', help = '' }) {
  return (
    <label className="adm-field">
      <span className="adm-label">{label}</span>
      {textarea ? (
        <textarea
          className="adm-input adm-textarea"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          className="adm-input"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
      {help && <span className="adm-field-help">{help}</span>}
    </label>
  );
}

function StatusPill({ dirty, saved }) {
  if (saved) return <span className="adm-status is-saved">Saved</span>;
  if (dirty) return <span className="adm-status is-dirty">Unsaved changes</span>;
  return <span className="adm-status">Up to date</span>;
}

function PanelHeader({ title, description, action }) {
  return (
    <div className="adm-panel-header">
      <div>
        <h3 className="adm-section-title">{title}</h3>
        {description && <p className="adm-section-sub">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function BiographyTab() {
  const [original, setOriginal] = useState(() => getStoredData('biography'));
  const [data, setData] = useState(original);
  const [saved, setSaved] = useState(false);
  const dirty = JSON.stringify(data) !== JSON.stringify(original) && !saved;

  function handleChange(e) {
    setSaved(false);
    setData(d => ({ ...d, [e.target.name]: e.target.value }));
  }

  function updateParagraph(index, value) {
    setSaved(false);
    setData(d => {
      const next = [...(d.introParagraphs || ['', ''])];
      next[index] = value;
      return { ...d, introParagraphs: next };
    });
  }

  function handleSave() {
    setStoredData('biography', data);
    setOriginal(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="adm-panel">
      <PanelHeader
        title="Biography Content"
        description="Keep this concise. These fields shape the first impression on the public homepage."
        action={<StatusPill dirty={dirty} saved={saved} />}
      />

      <div className="adm-form-grid">
        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Homepage hero</span>
            <h4>Primary message</h4>
          </div>
          <Field label="Hero Tagline" name="heroTagline" value={data.heroTagline || ''} onChange={handleChange} help="Shown beneath the main hero headline." />
        </section>

        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Intro section</span>
            <h4>Profile narrative</h4>
          </div>
          <Field label="Intro Quote" name="introQuote" value={data.introQuote || ''} onChange={handleChange} textarea />
          <Field label="Paragraph 1" name="p1" value={data.introParagraphs?.[0] || ''} onChange={e => updateParagraph(0, e.target.value)} textarea />
          <Field label="Paragraph 2" name="p2" value={data.introParagraphs?.[1] || ''} onChange={e => updateParagraph(1, e.target.value)} textarea />
          <Field label="Highlight Statement" name="introHighlights" value={data.introHighlights || ''} onChange={handleChange} textarea />
        </section>
      </div>

      <div className="adm-savebar">
        <span>{dirty ? 'Review your changes before publishing to the local site.' : 'No pending biography edits.'}</span>
        <button className={`adm-btn adm-btn-primary ${saved ? 'is-saved' : ''}`} onClick={handleSave}>
          {saved ? 'Saved' : 'Save Biography'}
        </button>
      </div>
    </div>
  );
}

function ListTab({ storeKey, title, description, emptyItem, fields, addLabel }) {
  const [items, setItems] = useState(() => getStoredData(storeKey));
  const [draft, setDraft] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [saved, setSaved] = useState(false);

  function persist(nextItems) {
    setItems(nextItems);
    setStoredData(storeKey, nextItems);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  function openAdd() {
    setDraft({ ...emptyItem });
    setEditingIndex(null);
  }

  function openEdit(index) {
    setDraft({ ...items[index] });
    setEditingIndex(index);
  }

  function closeModal() {
    setDraft(null);
    setEditingIndex(null);
  }

  function handleDraftChange(e) {
    setDraft(d => ({ ...d, [e.target.name]: e.target.value }));
  }

  function handleSaveItem() {
    const nextItems = editingIndex === null
      ? [...items, draft]
      : items.map((item, index) => (index === editingIndex ? draft : item));
    persist(nextItems);
    closeModal();
  }

  function handleDelete(index) {
    if (!window.confirm('Delete this item?')) return;
    persist(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="adm-panel">
      <PanelHeader
        title={title}
        description={description}
        action={<button className="adm-btn adm-btn-primary" onClick={openAdd}>{addLabel || 'Add New'}</button>}
      />

      <div className="adm-toolbar">
        <div>
          <strong>{items.length}</strong>
          <span>{items.length === 1 ? ' item' : ' items'}</span>
        </div>
        {saved && <span className="adm-status is-saved">Saved</span>}
      </div>

      {items.length > 0 ? (
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Title / Name</th>
                <th>Category</th>
                <th>Detail</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={`${item.title || item.name || item.tag}-${index}`}>
                  <td>
                    <strong>{item.title || item.name || 'Untitled'}</strong>
                    {item.excerpt && <span>{item.excerpt}</span>}
                  </td>
                  <td>{item.tag || item.mark || 'Item'}</td>
                  <td>{item.citation || item.period || item.metaDate || item.metaWords || item.role || '-'}</td>
                  <td><span className="adm-status">Visible</span></td>
                  <td>
                    <div className="adm-row-actions">
                      <button className="adm-icon-btn" onClick={() => openEdit(index)}>Edit</button>
                      <button className="adm-icon-btn is-danger" onClick={() => handleDelete(index)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="adm-empty-state">
          <h4>No content yet</h4>
          <p>Add the first item and it will appear on the connected public page.</p>
          <button className="adm-btn adm-btn-primary" onClick={openAdd}>{addLabel || 'Add New'}</button>
        </div>
      )}

      {draft && (
        <div className="adm-modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
          <div className="adm-modal">
            <div className="adm-modal-header">
              <div>
                <span className="adm-group-kicker">{editingIndex === null ? 'Create' : 'Update'}</span>
                <h4>{editingIndex === null ? addLabel || 'Add Item' : 'Edit Item'}</h4>
              </div>
              <button className="adm-modal-close" onClick={closeModal} aria-label="Close">x</button>
            </div>
            <div className="adm-modal-body">
              {fields.map(field => (
                <Field
                  key={field.name}
                  label={field.label}
                  name={field.name}
                  value={draft[field.name] || ''}
                  onChange={handleDraftChange}
                  textarea={field.textarea}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              ))}
            </div>
            <div className="adm-modal-footer">
              <button className="adm-btn adm-btn-soft" onClick={closeModal}>Cancel</button>
              <button className="adm-btn adm-btn-primary" onClick={handleSaveItem}>Save Item</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function BookTab() {
  const [original, setOriginal] = useState(() => getStoredData('bookSettings'));
  const [data, setData] = useState(original);
  const [saved, setSaved] = useState(false);
  const dirty = JSON.stringify(data) !== JSON.stringify(original) && !saved;

  function handleChange(e) {
    setSaved(false);
    setData(d => ({ ...d, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    setStoredData('bookSettings', data);
    setOriginal(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="adm-panel">
      <PanelHeader
        title="Book Launch Settings"
        description="These values power the countdown and purchase card on the book page."
        action={<StatusPill dirty={dirty} saved={saved} />}
      />

      <div className="adm-settings-grid">
        <Field label="Countdown Target Date" name="countdownTarget" value={data.countdownTarget || ''} onChange={handleChange} placeholder="2026-08-01T00:00:00" help="Use ISO date format for the countdown timer." />
        <Field label="Digital Price" name="digitalPrice" value={data.digitalPrice || ''} onChange={handleChange} placeholder="NGN 5,000" />
        <Field label="Purchase Link" name="purchaseLink" value={data.purchaseLink || ''} onChange={handleChange} placeholder="https://..." />
      </div>

      <div className="adm-savebar">
        <span>{dirty ? 'Book page settings have unpublished local changes.' : 'Book settings are current.'}</span>
        <button className={`adm-btn adm-btn-primary ${saved ? 'is-saved' : ''}`} onClick={handleSave}>
          {saved ? 'Saved' : 'Save Settings'}
        </button>
      </div>
    </div>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('felix_admin') === 'yes');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('biography');
  const [resetting, setResetting] = useState(false);
  const active = getTab(activeTab);

  function handleUnlock(e) {
    e.preventDefault();
    if (code === 'admin') {
      sessionStorage.setItem('felix_admin', 'yes');
      setUnlocked(true);
      setError('');
      return;
    }
    setError('Incorrect passcode.');
    setCode('');
  }

  function handleLogout() {
    sessionStorage.removeItem('felix_admin');
    setUnlocked(false);
    setCode('');
  }

  function handleReset() {
    if (!window.confirm('Reset all CMS content to the default values?')) return;
    resetToDefaults();
    setResetting(true);
    setTimeout(() => setResetting(false), 1600);
  }

  function renderTab() {
    switch (activeTab) {
      case 'biography':
        return <BiographyTab />;
      case 'research':
        return (
          <ListTab
            storeKey="researchPapers"
            title="Research Library"
            description={getTab('research').description}
            addLabel={getTab('research').addLabel}
            emptyItem={{ tag: '', title: '', citation: '', link: '' }}
            fields={[
              { name: 'tag', label: 'Tag' },
              { name: 'title', label: 'Paper Title', textarea: true },
              { name: 'citation', label: 'Citation' },
              { name: 'link', label: 'Link' },
            ]}
          />
        );
      case 'opinion':
        return (
          <ListTab
            storeKey="opinionArticles"
            title="Opinion Articles"
            description={getTab('opinion').description}
            addLabel={getTab('opinion').addLabel}
            emptyItem={{ tag: '', title: '', excerpt: '', metaDate: '', metaRead: '', link: '' }}
            fields={[
              { name: 'tag', label: 'Tag' },
              { name: 'title', label: 'Title' },
              { name: 'excerpt', label: 'Excerpt', textarea: true },
              { name: 'metaDate', label: 'Date' },
              { name: 'metaRead', label: 'Read Time' },
              { name: 'link', label: 'Link' },
            ]}
          />
        );
      case 'fiction':
        return (
          <ListTab
            storeKey="fictionArticles"
            title="Fiction Stories"
            description={getTab('fiction').description}
            addLabel={getTab('fiction').addLabel}
            emptyItem={{ tag: '', title: '', excerpt: '', metaWords: '', metaType: '', linkText: '', link: '' }}
            fields={[
              { name: 'tag', label: 'Tag' },
              { name: 'title', label: 'Title' },
              { name: 'excerpt', label: 'Excerpt', textarea: true },
              { name: 'metaWords', label: 'Word Count' },
              { name: 'metaType', label: 'Type' },
              { name: 'linkText', label: 'Link Text' },
              { name: 'link', label: 'Link' },
            ]}
          />
        );
      case 'affiliations':
        return (
          <ListTab
            storeKey="affiliations"
            title="Affiliations"
            description={getTab('affiliations').description}
            addLabel={getTab('affiliations').addLabel}
            emptyItem={{ mark: '', tag: '', name: '', role: '', period: '' }}
            fields={[
              { name: 'mark', label: 'Initials / Mark' },
              { name: 'tag', label: 'Category' },
              { name: 'name', label: 'Institution / Organization' },
              { name: 'role', label: 'Role' },
              { name: 'period', label: 'Period' },
            ]}
          />
        );
      case 'book':
        return <BookTab />;
      default:
        return null;
    }
  }

  if (!unlocked) {
    return (
      <main className="adm-lock-screen">
        <form className="adm-lock-card" onSubmit={handleUnlock}>
          <span className="adm-lock-kicker">CMS</span>
          <h1 className="adm-lock-title">Admin Access</h1>
          <p className="adm-lock-sub">Enter the passcode to manage website content.</p>
          <input
            className="adm-input adm-lock-input"
            type="password"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Passcode"
            autoFocus
          />
          {error && <p className="adm-error">{error}</p>}
          <button className="adm-btn adm-btn-primary" type="submit">Unlock Panel</button>
          <a className="adm-lock-link" href="#/">Back to site</a>
        </form>
      </main>
    );
  }

  return (
    <main className="adm-shell">
      <aside className="adm-sidebar">
        <a href="#/" className="adm-sidebar-brand">
          <span className="adm-brand-dot" />
          <span>Dr. Felix CMS</span>
        </a>

        <nav className="adm-nav" aria-label="Admin sections">
          {TABS.map(tab => (
            <button
              key={tab.id}
              className={`adm-nav-item ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <small>{tab.id === 'book' ? 'Settings' : 'Content'}</small>
            </button>
          ))}
        </nav>

        <div className="adm-sidebar-footer">
          <button className="adm-btn adm-btn-soft" onClick={handleReset}>{resetting ? 'Defaults Restored' : 'Reset Defaults'}</button>
          <button className="adm-btn adm-btn-soft" onClick={handleLogout}>Sign Out</button>
          <a className="adm-btn adm-btn-primary" href="#/">View Site</a>
        </div>
      </aside>

      <section className="adm-main">
        <header className="adm-topbar">
          <div>
            <span className="adm-lock-kicker">Content Manager</span>
            <h2 className="adm-topbar-title">{active.label}</h2>
            <p className="adm-topbar-sub">{active.description}</p>
          </div>
          <div className="adm-topbar-actions">
            <a className="adm-btn adm-btn-soft" href={active.previewHref}>Preview Page</a>
            <span className="adm-topbar-badge">#/admin</span>
          </div>
        </header>

        <div className="adm-content">{renderTab()}</div>
      </section>
    </main>
  );
}
