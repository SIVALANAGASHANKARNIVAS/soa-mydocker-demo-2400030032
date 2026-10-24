export function AlertMessage({ type = 'info', children, onClose }) {
  if (!children) return null;
  return <div className={`alert alert-${type} feedback-alert`} role="alert"><span>{children}</span>{onClose && <button className="btn-close" aria-label="Close" onClick={onClose} />}</div>;
}

export function Loading({ label = 'Loading...' }) {
  return <div className="loading-state"><div className="spinner-border spinner-border-sm" role="status" /><span>{label}</span></div>;
}

export function Field({ label, name, value, onChange, error, ...props }) {
  return <div className="mb-3"><label htmlFor={name} className="form-label">{label}</label><input id={name} name={name} value={value} onChange={onChange} className={`form-control ${error ? 'is-invalid' : ''}`} {...props} />{error && <div className="invalid-feedback">{error}</div>}</div>;
}
