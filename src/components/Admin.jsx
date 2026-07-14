import { useState } from 'react';
import { getStoredData, resetToDefaults, setStoredData } from '../utils/db';

const TABS = [
  {
    id: 'biography',
    label: 'Biography',
    description: 'Edit homepage hero copy, profile photo, intro quote, author summary, and roles list.',
    previewHref: '#/',
  },
  {
    id: 'expertise',
    label: 'Expertise Pillars',
    description: 'Manage featured expertise cards shown on the homepage.',
    previewHref: '#/',
    addLabel: 'Add Pillar',
  },
  {
    id: 'authorsNote',
    label: "Author's Note",
    description: "Update the author's note quote, body, and signature on the book page.",
    previewHref: '#/book',
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
    description: 'Update launch countdown, cover layout, details table, and pricing.',
    previewHref: '#/book',
  },
];

function getTab(id) {
  return TABS.find(tab => tab.id === id) || TABS[0];
}

function Field({ label, name, value, onChange, textarea, type = 'text', placeholder = '', help = '', options = [] }) {
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
      ) : type === 'select' ? (
        <select
          className="adm-input"
          name={name}
          value={value}
          onChange={onChange}
          style={{ background: 'var(--paper)', cursor: 'pointer', padding: '10px 14px' }}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
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

function ImageUploader({ label, value, onChange }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('File must be an image.');
      return;
    }

    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = function (event) {
      const img = new Image();
      img.src = event.target.result;
      img.onload = function () {
        // Create canvas for compression/resizing
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 400; // Profile image doesn't need to be huge
        const scale = Math.min(1, MAX_WIDTH / img.width);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert to jpeg with compression (0.7 quality)
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
        onChange(dataUrl);
        setLoading(false);
      };
      img.onerror = function() {
        setError('Error loading image.');
        setLoading(false);
      };
    };
    reader.readAsDataURL(file);
  }

  function handleReset() {
    onChange('');
  }

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid var(--line)',
          background: 'var(--paper-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
          {value ? (
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontSize: '10px', color: 'var(--text-soft)' }}>Default</span>
          )}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <label className="adm-btn adm-btn-soft" style={{ cursor: 'pointer', margin: 0, padding: '8px 12px', fontSize: '13px' }}>
              Upload Image
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
            </label>
            {value && (
              <button type="button" className="adm-btn adm-btn-soft is-danger" style={{ padding: '8px 12px', fontSize: '13px' }} onClick={handleReset}>
                Reset
              </button>
            )}
          </div>
          {loading && <span style={{ fontSize: '12px', color: 'var(--text-soft)' }}>Processing...</span>}
          {error && <span style={{ fontSize: '12px', color: 'var(--wine)' }}>{error}</span>}
          <span style={{ fontSize: '11px', color: 'var(--text-soft)' }}>JPEG/PNG. Resized & compressed automatically.</span>
        </div>
      </div>
    </div>
  );
}

function ListInput({ label, items, onChange, placeholder = 'Add item...' }) {
  const [inputValue, setInputValue] = useState('');

  function handleAdd() {
    if (!inputValue.trim()) return;
    onChange([...items, inputValue.trim()]);
    setInputValue('');
  }

  function handleRemove(index) {
    onChange(items.filter((_, idx) => idx !== index));
  }

  function handleUpdate(index, val) {
    const next = [...items];
    next[index] = val;
    onChange(next);
  }

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              className="adm-input"
              type="text"
              value={item}
              onChange={(e) => handleUpdate(index, e.target.value)}
              style={{ flex: 1, margin: 0 }}
            />
            <button
              type="button"
              className="adm-btn adm-btn-soft is-danger"
              style={{ padding: '8px 12px', flexShrink: 0 }}
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
          <input
            className="adm-input"
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAdd())}
            style={{ flex: 1, margin: 0 }}
          />
          <button
            type="button"
            className="adm-btn adm-btn-primary"
            style={{ padding: '10px 16px' }}
            onClick={handleAdd}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function KeyValueListInput({ label, items = [], onChange }) {
  function handleUpdate(index, field, val) {
    const next = [...items];
    next[index] = { ...next[index], [field]: val };
    onChange(next);
  }

  function handleAdd() {
    onChange([...items, { label: '', value: '' }]);
  }

  function handleRemove(index) {
    onChange(items.filter((_, idx) => idx !== index));
  }

  return (
    <div className="adm-field">
      <span className="adm-label">{label}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
        {items.map((item, index) => (
          <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <input
              className="adm-input"
              type="text"
              placeholder="Label (e.g. Genre)"
              value={item.label}
              onChange={(e) => handleUpdate(index, 'label', e.target.value)}
              style={{ flex: 1, margin: 0 }}
            />
            <input
              className="adm-input"
              type="text"
              placeholder="Value (e.g. Fiction)"
              value={item.value}
              onChange={(e) => handleUpdate(index, 'value', e.target.value)}
              style={{ flex: 1, margin: 0 }}
            />
            <button
              type="button"
              className="adm-btn adm-btn-soft is-danger"
              style={{ padding: '8px 12px', flexShrink: 0 }}
              onClick={() => handleRemove(index)}
            >
              Remove
            </button>
          </div>
        ))}
        <button
          type="button"
          className="adm-btn adm-btn-soft"
          style={{ alignSelf: 'flex-start', marginTop: '4px' }}
          onClick={handleAdd}
        >
          + Add Row
        </button>
      </div>
    </div>
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
          <Field label="Hero Eyebrow" name="heroEyebrow" value={data.heroEyebrow || ''} onChange={handleChange} />
          <Field label="Hero Headline" name="heroHeadline" value={data.heroHeadline || ''} onChange={handleChange} textarea help="Use newlines to separate lines." />
          <Field label="Hero Tagline" name="heroTagline" value={data.heroTagline || ''} onChange={handleChange} help="Shown beneath the main hero headline." />
          <ImageUploader label="Profile Image" value={data.profileImage || ''} onChange={(val) => { setSaved(false); setData(d => ({ ...d, profileImage: val })); }} />
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

        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Philosophy & contact</span>
            <h4>Core beliefs & details</h4>
          </div>
          <Field label="Philosophy Quote" name="philosophyQuote" value={data.philosophyQuote || ''} onChange={handleChange} textarea help="Use newlines to separate lines." />
          <Field label="Philosophy Paragraph" name="philosophyParagraph" value={data.philosophyParagraph || ''} onChange={handleChange} textarea />
          <Field label="Contact Email" name="contactEmail" value={data.contactEmail || ''} onChange={handleChange} />
          <Field label="Contact Location" name="contactLocation" value={data.contactLocation || ''} onChange={handleChange} />
        </section>

        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Identity roles</span>
            <h4>List of roles (Who I Am)</h4>
          </div>
          <ListInput label="Roles" items={data.roles || []} onChange={(nextRoles) => { setSaved(false); setData(d => ({ ...d, roles: nextRoles })); }} placeholder="Add role (e.g. AI Engineer)..." />
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

function AuthorsNoteTab() {
  const [original, setOriginal] = useState(() => getStoredData('authorsNote'));
  const [data, setData] = useState(original);
  const [saved, setSaved] = useState(false);
  const dirty = JSON.stringify(data) !== JSON.stringify(original) && !saved;

  function handleChange(e) {
    setSaved(false);
    setData(d => ({ ...d, [e.target.name]: e.target.value }));
  }

  function handleSave() {
    setStoredData('authorsNote', data);
    setOriginal(data);
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="adm-panel">
      <PanelHeader
        title="Author's Note Content"
        description="Edit the personal reflection block on the book page."
        action={<StatusPill dirty={dirty} saved={saved} />}
      />

      <div className="adm-form-grid">
        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Author's Note</span>
            <h4>Quote & paragraphs</h4>
          </div>
          <Field label="Note Quote" name="quote" value={data.quote || ''} onChange={handleChange} textarea />
          <Field label="Paragraph 1" name="p1" value={data.p1 || ''} onChange={handleChange} textarea />
          <Field label="Paragraph 2" name="p2" value={data.p2 || ''} onChange={handleChange} textarea />
          <Field label="Signature" name="sign" value={data.sign || ''} onChange={handleChange} />
          <ImageUploader label="Custom Photo (Optional)" value={data.image || ''} onChange={(val) => { setSaved(false); setData(d => ({ ...d, image: val })); }} />
        </section>
      </div>

      <div className="adm-savebar">
        <span>{dirty ? 'Unsaved changes to Author\'s Note.' : 'Author\'s Note content is current.'}</span>
        <button className={`adm-btn adm-btn-primary ${saved ? 'is-saved' : ''}`} onClick={handleSave}>
          {saved ? 'Saved' : 'Save Author\'s Note'}
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
                    {item.excerpt && <span style={{ display: 'block', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>{item.excerpt}</span>}
                    {item.description && <span style={{ display: 'block', fontSize: '12px', opacity: 0.7, marginTop: '4px' }}>{item.description}</span>}
                  </td>
                  <td>{item.tag || item.mark || item.iconName || 'Item'}</td>
                  <td>{item.citation || item.period || item.metaDate || item.metaWords || item.role || item.linkText || '-'}</td>
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
                  options={field.options}
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
  const [settingsOriginal, setSettingsOriginal] = useState(() => getStoredData('bookSettings'));
  const [settings, setSettings] = useState(settingsOriginal);

  const [heroOriginal, setHeroOriginal] = useState(() => getStoredData('bookHero'));
  const [hero, setHero] = useState(heroOriginal);

  const [detailsOriginal, setDetailsOriginal] = useState(() => getStoredData('bookDetailsList'));
  const [details, setDetails] = useState(detailsOriginal);

  const [saved, setSaved] = useState(false);

  const dirty = (
    JSON.stringify(settings) !== JSON.stringify(settingsOriginal) ||
    JSON.stringify(hero) !== JSON.stringify(heroOriginal) ||
    JSON.stringify(details) !== JSON.stringify(detailsOriginal)
  ) && !saved;

  function handleSave() {
    setStoredData('bookSettings', settings);
    setStoredData('bookHero', hero);
    setStoredData('bookDetailsList', details);

    setSettingsOriginal(settings);
    setHeroOriginal(hero);
    setDetailsOriginal(details);

    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="adm-panel">
      <PanelHeader
        title="Book & Cover Settings"
        description="Configure titles, text, pricing, countdown, and detail metadata for the book landing page."
        action={<StatusPill dirty={dirty} saved={saved} />}
      />

      <div className="adm-form-grid">
        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Book landing hero</span>
            <h4>Intro copy</h4>
          </div>
          <Field label="Hero Eyebrow" value={hero.eyebrow || ''} onChange={e => { setSaved(false); setHero(h => ({ ...h, eyebrow: e.target.value })); }} />
          <Field label="Hero Headline" value={hero.headline || ''} onChange={e => { setSaved(false); setHero(h => ({ ...h, headline: e.target.value })); }} textarea help="Use newlines for breaks, and · for middle-dots." />
          <Field label="Hero Tagline" value={hero.tagline || ''} onChange={e => { setSaved(false); setHero(h => ({ ...h, tagline: e.target.value })); }} textarea />
        </section>

        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Book cover style</span>
            <h4>Cover title & subtitle</h4>
          </div>
          <Field label="Cover Title" value={hero.coverTitle || ''} onChange={e => { setSaved(false); setHero(h => ({ ...h, coverTitle: e.target.value })); }} textarea help="Use newlines to split title lines on the cover." />
          <Field label="Cover Subtitle" value={hero.coverSubtitle || ''} onChange={e => { setSaved(false); setHero(h => ({ ...h, coverSubtitle: e.target.value })); }} />
        </section>

        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Launch settings</span>
            <h4>Countdown & links</h4>
          </div>
          <Field label="Countdown Target Date" value={settings.countdownTarget || ''} onChange={e => { setSaved(false); setSettings(s => ({ ...s, countdownTarget: e.target.value })); }} placeholder="2026-08-01T00:00:00" help="ISO date format." />
          <Field label="Digital Price" value={settings.digitalPrice || ''} onChange={e => { setSaved(false); setSettings(s => ({ ...s, digitalPrice: e.target.value })); }} />
          <Field label="Purchase Link" value={settings.purchaseLink || ''} onChange={e => { setSaved(false); setSettings(s => ({ ...s, purchaseLink: e.target.value })); }} />
        </section>

        <section className="adm-form-group">
          <div className="adm-group-head">
            <span className="adm-group-kicker">Book details</span>
            <h4>Metadata key-value pairs</h4>
          </div>
          <KeyValueListInput label="Details Table" items={details} onChange={(nextVal) => { setSaved(false); setDetails(nextVal); }} />
        </section>
      </div>

      <div className="adm-savebar">
        <span>{dirty ? 'Book details have unsaved local changes.' : 'Book settings are current.'}</span>
        <button className={`adm-btn adm-btn-primary ${saved ? 'is-saved' : ''}`} onClick={handleSave}>
          {saved ? 'Saved' : 'Save Book Settings'}
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
      case 'expertise':
        return (
          <ListTab
            storeKey="expertiseList"
            title="Featured Expertise"
            description={getTab('expertise').description}
            addLabel={getTab('expertise').addLabel}
            emptyItem={{ iconName: 'BrainCircuit', title: '', description: '', link: '', linkText: '' }}
            fields={[
              {
                name: 'iconName',
                label: 'Icon Component Name',
                type: 'select',
                options: [
                  { value: 'BrainCircuit', label: 'Brain Circuit (AI)' },
                  { value: 'SearchCode', label: 'Search Code (Research)' },
                  { value: 'Library', label: 'Library (Books)' },
                  { value: 'Presentation', label: 'Presentation (Teaching)' },
                  { value: 'Lightbulb', label: 'Lightbulb (Innovation)' },
                  { value: 'BookOpen', label: 'Book Open (Speaking)' }
                ]
              },
              { name: 'title', label: 'Title' },
              { name: 'description', label: 'Description', textarea: true },
              { name: 'link', label: 'Link (e.g. #/research)' },
              { name: 'linkText', label: 'Link Text (e.g. Explore Research)' }
            ]}
          />
        );
      case 'authorsNote':
        return <AuthorsNoteTab />;
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
              <small>{tab.id === 'book' || tab.id === 'authorsNote' ? 'Settings' : 'Content'}</small>
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
