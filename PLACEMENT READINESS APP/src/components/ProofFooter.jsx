/**
 * Proof Footer — KodNest Premium Build System
 * Persistent bottom section: checklist with proof input
 */

export function ProofFooter({ items = [], onChange }) {
  const defaultItems = [
    { id: 'ui', label: 'UI Built', checked: false },
    { id: 'logic', label: 'Logic Working', checked: false },
    { id: 'test', label: 'Test Passed', checked: false },
    { id: 'deployed', label: 'Deployed', checked: false },
  ];

  const checklist = items.length ? items : defaultItems;

  return (
    <footer className="proof-footer">
      <div className="proof-footer__checklist">
        {checklist.map((item) => (
          <div key={item.id} className="proof-checkbox">
            <input
              type="checkbox"
              id={item.id}
              checked={item.checked}
              onChange={(e) => onChange?.(item.id, e.target.checked)}
            />
            <label htmlFor={item.id}>{item.label}</label>
          </div>
        ))}
      </div>
    </footer>
  );
}
