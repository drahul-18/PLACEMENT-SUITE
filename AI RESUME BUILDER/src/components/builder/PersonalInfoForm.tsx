import type { ResumeData } from '../../types/resume';

interface Props {
  data: ResumeData['personal'];
  onChange: (personal: ResumeData['personal']) => void;
}

export function PersonalInfoForm({ data, onChange }: Props) {
  return (
    <section className="form-section">
      <h3>Personal Info</h3>
      <div className="form-grid">
        <div className="form-field">
          <label>Name</label>
          <input
            value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Full name"
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="email@example.com"
          />
        </div>
        <div className="form-field">
          <label>Phone</label>
          <input
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+1 (555) 000-0000"
          />
        </div>
        <div className="form-field">
          <label>Location</label>
          <input
            value={data.location}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            placeholder="City, State"
          />
        </div>
      </div>
    </section>
  );
}
