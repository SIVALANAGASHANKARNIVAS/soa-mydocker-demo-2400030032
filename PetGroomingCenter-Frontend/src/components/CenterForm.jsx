import { useState } from 'react';
import { Field } from './Feedback.jsx';

const blank = { centerName: '', location: '', contact: '', servicecount: '0', open: true };

export default function CenterForm({ initialValue = blank, submitLabel = 'Save center', onSubmit, busy = false }) {
  const [form, setForm] = useState({ ...blank, ...initialValue, servicecount: String(initialValue.servicecount ?? 0), open: initialValue.open ?? true });
  const [errors, setErrors] = useState({});
  const change = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'open' ? value === 'true' : value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  const validate = () => {
    const next = {};
    if (!form.centerName.trim()) next.centerName = 'Center name is required.';
    if (!form.location.trim()) next.location = 'Location is required.';
    if (!/^[6-9]\d{9}$/.test(form.contact)) next.contact = 'Enter a valid 10-digit Indian mobile number.';
    if (form.servicecount === '' || !Number.isInteger(Number(form.servicecount)) || Number(form.servicecount) < 0) next.servicecount = 'Enter a whole number (0 or greater).';
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({ centerName: form.centerName.trim(), location: form.location.trim(), contact: form.contact.trim(), servicecount: Number(form.servicecount), open: Boolean(form.open) });
  };

  return <form onSubmit={handleSubmit} noValidate>
    <div className="form-section-title"><span className="step-number">01</span><div><strong>Center details</strong><small>Basic information about the grooming center</small></div></div>
    <div className="row g-3"><div className="col-md-6"><Field label="Center name *" name="centerName" placeholder="e.g. Happy Paws Grooming" value={form.centerName} onChange={change} error={errors.centerName} maxLength={100} /></div><div className="col-md-6"><Field label="Location *" name="location" placeholder="Area, city" value={form.location} onChange={change} error={errors.location} maxLength={150} /></div><div className="col-md-6"><Field label="Contact number *" name="contact" placeholder="10-digit mobile number" inputMode="numeric" maxLength={10} value={form.contact} onChange={change} error={errors.contact} /></div><div className="col-md-6"><Field label="Service count *" name="servicecount" type="number" min="0" step="1" value={form.servicecount} onChange={change} error={errors.servicecount} /></div><div className="col-md-6"><label htmlFor="open" className="form-label">Operating status *</label><select id="open" name="open" value={String(form.open)} onChange={change} className="form-select"><option value="true">Open</option><option value="false">Closed</option></select></div></div>
    <div className="form-actions"><span className="required-note">* Required fields</span><button className="btn btn-primary px-4" type="submit" disabled={busy}>{busy ? <><span className="spinner-border spinner-border-sm me-2" />Saving...</> : <><i className="bi bi-check2-circle me-2" />{submitLabel}</>}</button></div>
  </form>;
}
