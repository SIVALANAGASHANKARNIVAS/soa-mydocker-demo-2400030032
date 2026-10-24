import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CenterForm from '../components/CenterForm.jsx';
import { AlertMessage, Loading } from '../components/Feedback.jsx';
import { centerApi, getErrorMessage } from '../services/centerApi.js';

export default function UpdatePage() {
  const [params] = useSearchParams(); const [id, setId] = useState(params.get('id') || ''); const [center, setCenter] = useState(null); const [busy, setBusy] = useState(false); const [saving, setSaving] = useState(false); const [error, setError] = useState(''); const [success, setSuccess] = useState('');
  const load = async (e, value = id) => { e?.preventDefault(); if (!/^\d+$/.test(String(value).trim()) || Number(value) < 1) { setError('Enter a valid positive center ID.'); return; } setBusy(true); setError(''); setSuccess(''); setCenter(null); try { setCenter(await centerApi.getById(value)); } catch (err) { setError(getErrorMessage(err)); } finally { setBusy(false); } };
  useEffect(() => { const q = params.get('id'); if (q) { setId(q); load(null, q); } }, [params]);
  const update = async (data) => { setSaving(true); setError(''); setSuccess(''); try { const result = await centerApi.update(center.id, data); setCenter(result); setSuccess(`Center #${result.id} updated successfully.`); } catch (e) { setError(getErrorMessage(e)); } finally { setSaving(false); } };
  return <><div className="panel-card lookup-card"><form onSubmit={load}><label htmlFor="updateId" className="form-label">Center ID to update</label><div className="lookup-row"><div className="input-with-icon"><i className="bi bi-hash" /><input id="updateId" className="form-control" type="number" min="1" placeholder="Enter existing center ID" value={id} onChange={e => setId(e.target.value)} /></div><button className="btn btn-primary" disabled={busy || !id}>{busy ? 'Loading...' : <><i className="bi bi-pencil-square me-2" />Load center</>}</button></div><small className="form-text">First load the existing record, then edit its fields.</small></form></div>
    {error && <AlertMessage type="danger" onClose={() => setError('')}>{error}</AlertMessage>}{success && <AlertMessage type="success" onClose={() => setSuccess('')}>{success}</AlertMessage>}{busy && <Loading label="Loading center details..." />}
    {center && !busy && <div className="panel-card form-card"><div className="panel-card-header"><div className="form-heading-icon"><i className="bi bi-pencil-square" /></div><div><h2>Editing {center.centerName}</h2><p>Center ID #{center.id} · Update the fields and save your changes.</p></div></div><CenterForm key={center.id + '-' + (success ? 'updated' : 'loaded')} initialValue={center} submitLabel="Save changes" onSubmit={update} busy={saving} /></div>}
  </>;
}
